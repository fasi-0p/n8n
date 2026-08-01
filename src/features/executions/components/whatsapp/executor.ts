import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars";
import { whatsappChannel } from "@/inngest/channels/whatsapp";
import { decode } from "html-entities";
import ky from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context);
  return new Handlebars.SafeString(jsonString);
});

type whatsappData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
  username?: string;
};

export const WhatsAppExecutor: NodeExecutor<whatsappData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    whatsappChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.webhookUrl) {
    await publish(
      whatsappChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw new NonRetriableError("whatsapp node: webhook url is required");
  }

  if (!data.content) {
    await publish(
      whatsappChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw new NonRetriableError("whatsapp node: Message content is required");
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);
  const username = data.username
    ? decode(Handlebars.compile(data.username)(context))
    : undefined;

  try {
    const result = await step.run("whatsapp-webhook", async () => {
      await ky.post(data.webhookUrl!, {
        json: {
          content: content.slice(0, 2000), // max message length
          username,
        },
      });

      if (!data.variableName) {
        await publish(
          whatsappChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError("whatsapp node: Variable name is missing");
      }

      return {
        ...context,
        [data.variableName]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish(
      whatsappChannel().status({
        nodeId,
        status: "success",
      })
    );

    return result;
  } catch (error) {
    await publish(
      whatsappChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};

import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context);
  return new Handlebars.SafeString(jsonString);
});

type HttpsRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpsRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    })
  )

  if (!data.endpoint) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  if (!data.variableName) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("Variable name not configured");
  }

  if (!data.method) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("HTTP Request node: Method not configured");
  }

  try{
    const result = await step.run("http-request", async () => {
      const endpoint = Handlebars.compile(data.endpoint)(context);
      console.log("ENDPOINT", { endpoint });

      const method = typeof data.method === "string" ? data.method : "GET";
      const options: KyOptions = { method };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        // body is optional; compile only if it exists
        const resolved = data.body
          ? Handlebars.compile(data.body)(context)
          : undefined;

        if (resolved != null) {
          // validate JSON but throw a clean non-retriable error
          try {
            JSON.parse(resolved);
          } catch {
            throw new NonRetriableError(
              "HTTP Request node: Body must be valid JSON"
            );
          }

          options.body = resolved;
          options.headers = {
            ...(options.headers ?? {}),
            "content-type": "application/json",
          };
        }
      }

      const response = await ky(endpoint, options);

      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      const responsePayload = {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      };

      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    });

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      })
    )
    return result;
  }catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw error;
  }

};

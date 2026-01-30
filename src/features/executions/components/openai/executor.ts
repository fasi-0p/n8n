import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import {createOpenAI} from '@ai-sdk/openai'
import {generateText} from "ai"
import Handlebars from "handlebars";
import { openAiChannel } from "@/inngest/channels/openai";
import prisma from "@/lib/db";
import { anthropicChannel } from "@/inngest/channels/anthropic";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context);
  return new Handlebars.SafeString(jsonString);
});

type OpenAiData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const OpenAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish(
    openAiChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.variableName){
    await publish(
      openAiChannel().status({
        nodeId, status: "error"
      })
    )
    throw new NonRetriableError("OpenAi node: Variable name is missing")
  }

  if (!data.variableName){
      await publish(
        anthropicChannel().status({
          nodeId, status: "error"
        })
      )
      throw new NonRetriableError("Gemini node: Credential is missing")
    }

  if(!data.userPrompt){
    await publish(
      openAiChannel().status({
        nodeId, status: "error"
      })
    )
    throw new NonRetriableError("OpenAi node: User prompt is missing")
  }

  

  const systemPrompt = data.systemPrompt? Handlebars.compile(data.systemPrompt)(context) : "You are a helful assistant";

  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", ()=>{
      return prisma.credential.findUnique({
        where:{id: data.credentialId, userId},
        select:{value: true}
      })
    })
  
    if (!credential){
      await publish(
      openAiChannel().status({
        nodeId, status: "error"
      })
    )
      throw new NonRetriableError("OpenAI node: credential not found")
    }
    
  const openai=createOpenAI({
    apiKey: credential.value
  })

  try{
    const {steps} = await step.ai.wrap(
      "openai-generate-text",
       generateText,
        {
          model: openai("gpt-4"),
          system: systemPrompt,
          prompt: userPrompt,
          experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
          }
        })

        const text = steps[0].content[0].type==='text'? steps[0].content[0].text : ""

        await publish(
          openAiChannel().status({
            nodeId, status: "success"
          })
        )

        return {
          ...context,
          [data.variableName]: {
            aiResponse: text
          }
        }
  }catch (error) {
    await publish(
      openAiChannel().status({
        nodeId, status: "error"
      })
    )
    throw error;
  }
};

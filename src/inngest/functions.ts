import { inngest } from "./client";
import { NonRetriableError } from "inngest";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { NodeType } from "@/generated/prisma"; 
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";
import { googleFormTriggerChannel } from "./channels/google-form-trigger";
import {stripeTriggerChannel} from "./channels/stripe-trigger"
import {geminiChannel} from "./channels/gemini"
import {openAiChannel} from "./channels/openai"
import {anthropicChannel} from "./channels/anthropic"
import {discordChannel} from "./channels/discord"
import {slackChannel} from "./channels/slack"
import {newspaperTriggerChannel} from "./channels/newspaper-trigger"
import {whatsappChannel} from "./channels/whatsapp"
import {ExecutionStatus} from "@/generated/prisma"

export const runtime = "nodejs";

export const executeWorkflow = inngest.createFunction(
  {
    id: 'execute-workflow',
    retries: process.env.NODE_ENV === 'production'? 3:0, 
    onFailure: async ({event, step}) =>{
      return prisma.execution.update({
        where: {inngestEventId: event.data.event.id},
        data:{
          status: ExecutionStatus.FAILED,
          error: event.data.error.message,
          errorStack: event.data.error.stack,
        }
      })
    }
  },
  {
    event: "workflows/execute.workflow",
    channels: [httpRequestChannel(), manualTriggerChannel(), googleFormTriggerChannel(), stripeTriggerChannel(), geminiChannel(), openAiChannel(), anthropicChannel(), discordChannel(), slackChannel(), newspaperTriggerChannel(), whatsappChannel()]  //update here everytime you add a new inngest channel
  },
  async ({event, step, publish}) =>{
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId

    if (!inngestEventId){
      throw new NonRetriableError("Inngest event ID is missing")
    }

    if(!workflowId){
      throw new NonRetriableError("Workflow ID is missing")
    }

    await step.run("create-execution", async()=>{
      await prisma.execution.create({
        data: {
          workflowId,
          inngestEventId
        }
      })
    })

    const sortedNodes = await step.run("prepare-workflow", async ()=> {
      const  workflow = await prisma.workflow.findUniqueOrThrow({
        where: {id:workflowId},
        include: {nodes: true, connections:true},
      })

      return topologicalSort(workflow.nodes, workflow.connections)
    });

    const userId = await step.run("find-user-id", async()=>{
      const  workflow = await prisma.workflow.findUniqueOrThrow({
        where: {id:workflowId},
        select: {userId: true},
      })

      return workflow.userId
    })

    //Initialize the context with any initial data from the trigger TODO
    let context = event.data.initialData || {};

    //execute each node
    for(const node of sortedNodes){
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        userId,
        context,
        step,
        publish
      })
    }

    await step.run("update-execution", async()=>{
      await prisma.execution.update({
        where: {inngestEventId, workflowId},
        data: {
          status: ExecutionStatus.SUCCESS,
          completedAt: new Date(),
          output: context
        }
      })
    })


    return {
      workflowId,
      result: context
    };
  }
)
import { inngest } from "./client";
import prisma from '@/lib/db';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    //fetching the vid                                                 //CONCEPTUALLY,
    await step.sleep("fetching...", "5s");

    //transcribing the vid
    await step.sleep("transcribing...", "5s");

    //sending transcription to llm
    await step.sleep("send to llm...", "5s");

    console.log('Hello world'); //testing
    await step.run("create-workflow", ()=>{
        return prisma.workflow.create({
            data: {
              name: "workflow- from inngest"
            },
          })
    })
  },
);
import { createTRPCRouter, protectedProcedure, baseProcedure } from '../init';
import prisma from '@/lib/db';
import {inngest} from '@/inngest/client';
import { NextResponse } from "next/server";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  
  testAi: baseProcedure.mutation( async()=>{
    await inngest.send({
      name: "execute/ai"
    })
    return {success: true, message:"Job queued"}
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data:{
        email: 'temp@gmail.com',
        name: 'temp'
      },
    });
    return {success: true, message:"Job queued"}

    // return prisma.workflow.create({  //Not needed, shifted to src/inngest/functions.ts
    //   data: {
    //     name: "test-workflow"
    //   },
    // });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
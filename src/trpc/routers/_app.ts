import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    //fetch vid
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    //transcribe vid
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    //send trancription to openai
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    return prisma.workflow.create({
      data: {
        name: "test-workflow"
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
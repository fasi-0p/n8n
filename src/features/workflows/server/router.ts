import { generateSlug } from "random-word-slugs";
import { createTRPCRouter, protectedProcedure, premiumProcedure } from "@/trpc/init";
import prisma from "@/lib/db";
import { z } from "zod";

//mapping each workflow name to userId
export const workflowsRouter = createTRPCRouter({  //CRUD
  create: premiumProcedure.mutation(({ ctx }) => {  //create
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
  }),

  remove: protectedProcedure  //delete
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.deleteMany({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),

  updateName: protectedProcedure  //update
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.updateMany({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  getOne: protectedProcedure  //read
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return prisma.workflow.findFirst({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),

  getMany: protectedProcedure
    .query(({ ctx }) => {
      return prisma.workflow.findMany({
        where: {
          userId: ctx.auth.user.id,
        },
      });
    }),
});

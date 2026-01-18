import { generateSlug } from "random-word-slugs";
import { createTRPCRouter, protectedProcedure, premiumProcedure } from "@/trpc/init";
import prisma from "@/lib/db";
import { z } from "zod";
import { PAGINATION } from "@/config/constants";
import type {Node, Edge} from "@xyflow/react"
import { NodeType } from "@/generated/prisma/client";

//mapping each workflow name to userId
export const workflowsRouter = createTRPCRouter({  //CRUD
  create: premiumProcedure.mutation(({ ctx }) => {  //create
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
        nodes:{
          create:{
            type: NodeType.INITIAL,
            position:{x:0, y:0},
            name:NodeType.INITIAL
          }
        }
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
    .query(async({ ctx, input }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {id: input.id, userId: ctx.auth.user.id,},
        include:{ nodes: true, connections: true},
      });
      //transform server nodes to react-flow compatible nodes
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as {x: number, y: number},
        data: (node.data as Record<string, unknown>) || {}
      }))
      //transform server connections to react-flow compatible connections
      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }))
      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      }
    }),

  getMany: protectedProcedure
  .input(z.object({page: z.number().default(PAGINATION.DEFAULT_PAGE),
    pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
    search: z.string().default(""),
  }))
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page -1) * pageSize, 
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ])

      const totalPage = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPage;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPage,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});

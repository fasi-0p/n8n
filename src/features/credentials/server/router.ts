import { createTRPCRouter, protectedProcedure, premiumProcedure } from "@/trpc/init";
import prisma from "@/lib/db";
import { z } from "zod";
import { PAGINATION } from "@/config/constants";
import { CredentialType } from "@/generated/prisma/client";

//mapping each credential name to userId
export const credentialsRouter = createTRPCRouter({  //CRUD
  create: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1, "Name is required"),
      type: z.enum(CredentialType),
      value: z.string().min(1, "Value is required")
    })
  )
  .mutation(({ ctx, input }) => {  //create //protected bcz i dont want only subscribed users to use their api
    const {name, type, value} = input;

    return prisma.credential.create({
      data: {
        name,
        userId: ctx.auth.user.id,
        type,
        value, //TODO Encrypting in production
      },
    });
  }),

  remove: protectedProcedure  //delete
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.credential.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),

  update: protectedProcedure  //update
    .input(z.object({ 
      id: z.string(),
      name: z.string().min(1, "Name is required"),
      type: z.enum(CredentialType),
      value: z.string().min(1, "Value is required")
      }),
    )
    .mutation( ({ ctx, input }) => {
      const {id, name, type, value}= input;

      return prisma.credential.update({
        where:{id, userId: ctx.auth.user.id},
        data:{
          name,
          type, 
          value} //TODO encrypiton in production
      })

    }),
  updateName: protectedProcedure  //update
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return prisma.credential.updateMany({
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
      return  prisma.credential.findUniqueOrThrow({
        where: {id: input.id, userId: ctx.auth.user.id,},
      });
      
    }),

  getMany: protectedProcedure
  .input(z.object({page: z.number().default(PAGINATION.DEFAULT_PAGE),
    pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
    search: z.string().default(""),
  }))
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const [items, totalCount] = await Promise.all([
        prisma.credential.findMany({
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

        prisma.credential.count({
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
  getByType: protectedProcedure
    .input(
      z.object({
        type: z.enum(CredentialType),
      })
    )
    .query( ({ ctx, input }) => {
      const {type} =input;
      return prisma.credential.findMany({
        where: {userId: ctx.auth.user.id,},
        orderBy:{updatedAt: "desc"},
      });
    }),

});

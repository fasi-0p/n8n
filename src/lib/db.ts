import {PrismaClient} from "@/generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma


// alright we could have just have had export const prisma=new PrismaClient(), but but but,
//to prevent development issue ie, when we do minor changes multiple times it creates new instances of PrismaClient and we get a bunch of errors
//inorder to not draw down development speed we have this technique 

//in production its just [export const prisma = new PrismaClient();]
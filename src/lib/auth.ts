import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import prisma from "@/lib/db";
import {polarClient} from './polar'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword:{
        enabled: true,
        autoSignIn:true 
    },
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        } 
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: process.env.POLAR_PRODUCT_ID as string,
                            slug: "n8n-pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/n8n-pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                })
            ],
        })
    ]
});
import { betterAuth } from "better-auth";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    // server: process.env.POLAR_SERVER as "production" | "sandbox",
});


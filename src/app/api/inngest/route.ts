import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { execute } from "../../../inngest/functions";
import {appRouter} from '@/trpc/routers/_app';


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    execute, // <-- This is where you'll always add all your functions
  ],
});
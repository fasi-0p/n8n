import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { executeWorkflow } from "../../../inngest/functions";
import {appRouter} from '@/trpc/routers/_app';


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    executeWorkflow, // <-- This is where you'll always add all your functions
  ],
});
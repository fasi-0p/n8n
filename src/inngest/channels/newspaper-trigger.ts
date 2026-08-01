import { channel, topic } from "@inngest/realtime";

export const NEWSPAPER_TRIGGER_CHANNEL_NAME = "newspaper-trigger-execution";

export const newspaperTriggerChannel = channel(NEWSPAPER_TRIGGER_CHANNEL_NAME).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);



  // ### Validation of your idea

  // Your idea of mimicking the Discord node for WhatsApp works perfectly! In this codebase, nodes like Discord
  // are Execution Nodes—they take a target URL and payload, and use an HTTP library (like  ky ) to send out the
  // message during workflow execution. I've built the WhatsApp Node using the exact same logic. You can use any
  // WhatsApp gateway webhook, but for a free personal setup connected directly to your phone, CallMeBot's
  // WhatsApp API is highly recommended and requires zero complex Meta business verification.

  // ### News Webhook Recommendation

  // For the Newspaper node, I recommend using Finnhub or Alpha Vantage. They are among the best free financial
  // news APIs that provide real-time coverage. You can configure them to send webhook events to your application
  // when major financial news breaks.

  // ### What I Implemented

  // I have integrated a complete end-to-end flow for your feature:

  // 1. Prisma Schema Update: Added  NEWSPAPER_TRIGGER  and  WHATSAPP  to the  NodeType  enum in  prisma/schema.
  // prisma  and regenerated the client.
  // 2. Financial News Trigger Node:
  //     • Created the  NewspaperTrigger  node ( src/features/triggers/components/newspaper-trigger ).
  //     • The UI displays it as "Financial News".
  //     • Built a setup dialog that generates your custom Webhook URL. You will copy this URL and paste it into
  //     the Finnhub webhook dashboard.
  //     • It exposes variables like  {{newspaper.title}} ,  {{newspaper.summary}} , and  {{newspaper.url}}  for
  //     you to map to your WhatsApp node.
  // 3. Newspaper Webhook API: Added a new Next.js route at  src/app/api/webhooks/newspaper/route.ts  that
  // receives the news payload from the external API, structures it, and starts your Inngest workflow.
  // 4. WhatsApp Execution Node:
  //     • Created the  WhatsApp  node ( src/features/executions/components/whatsapp ).
  //     • The node takes a  Webhook URL  and the  Message Content  text area.
  //     • It executes a POST request when reached, pushing the mapped news payload directly to your phone.
  // 5. System Wiring: Registered both nodes in your  node-components.ts  and  node-selector.tsx , added Inngest
  // realtime channels for them, and wired up their executors in  executor-registry.ts .

  // ### How to test it

  // 1. Restart your development server ( npm run dev:all ).
  // 2. In the flow builder, add a Financial News trigger node and a WhatsApp execution node.
  // 3. Open the settings of the Financial News node, copy the provided Webhook URL, and register it with your
  // chosen news provider (or hit it manually with Postman/cURL for testing).
  // 4. In the WhatsApp node settings, enter your CallMeBot API URL (or WhatsApp Cloud API URL) and format your
  // message using  {{newspaper.title}}  and  {{newspaper.summary}} .

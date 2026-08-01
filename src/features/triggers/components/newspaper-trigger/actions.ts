"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { newspaperTriggerChannel } from "@/inngest/channels/newspaper-trigger";
import { inngest } from "@/inngest/client";

export type newspaperTriggerToken = Realtime.Token<
  typeof newspaperTriggerChannel,
  ["status"]
>;

export async function fetchNewspaperTriggerRealtimeToken(): Promise<newspaperTriggerToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: newspaperTriggerChannel(),
    topics: ["status"],
  });

  return token;
}

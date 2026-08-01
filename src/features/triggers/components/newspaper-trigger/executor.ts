import type { NodeExecutor } from "@/features/executions/types";
import { newspaperTriggerChannel } from "@/inngest/channels/newspaper-trigger";

// type ManualTriggerData = {
//     endpoint? : string;
//     method?: string;
//     body?: string;
// }

type NewspaperTriggerData = Record<string, unknown>

export const newspaperTriggerExecutor: NodeExecutor<NewspaperTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    newspaperTriggerChannel().status({
      nodeId,
      status: 'loading'
    })
  )

  const result = await step.run("newspaper-trigger", async () => context);

  await publish(
    newspaperTriggerChannel().status({
      nodeId,
      status: 'success'
    })
  )

  return result;
};

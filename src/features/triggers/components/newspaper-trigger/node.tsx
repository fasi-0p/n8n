import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { NewspaperTriggerDialog } from "./dialog";
import { useState } from "react";
import {useNodeStatus} from '@/features/executions/hooks/use-node-status'
import {NEWSPAPER_TRIGGER_CHANNEL_NAME} from "@/inngest/channels/newspaper-trigger"
import {fetchNewspaperTriggerRealtimeToken} from "./actions"

export const NewspaperTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {setDialogOpen(true)};
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: NEWSPAPER_TRIGGER_CHANNEL_NAME,
    topic: 'status',
    refreshToken: fetchNewspaperTriggerRealtimeToken,
  });

  return (
    <>
      <NewspaperTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
      <BaseTriggerNode
        {...props}
        icon={"/logos/news.svg"}
        name="Newspaper"
        description="when newspaper event happens"
        status={nodeStatus}
        nodeType="NEWSPAPER_TRIGGER"
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

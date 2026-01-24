import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { GoogleFormTriggerDialog } from "./dialog";
import { useState } from "react";
import {useNodeStatus} from '@/features/executions/hooks/use-node-status'
import {MANUAL_TRIGGER_CHANNEL_NAME} from "@/inngest/channels/manual-trigger"
import {fetchManualTriggerRealtimeToken} from "./actions"

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {setDialogOpen(true)};
  const nodeStatus = 'initial';

  return (
    <>
      <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
      <BaseTriggerNode
        {...props}
        icon={"/logos/googleform.svg"}
        name="Google Form"
        description="Runs the flow when Google Form is submitted"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

'use client'

import type { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useState } from "react";
import { WhatsAppDialog, WhatsAppFormValues } from "./dialog";
import { useReactFlow } from "@xyflow/react";
import {useNodeStatus} from '../../hooks/use-node-status'
import {fetchWhatsAppRealtimeToken} from "@/features/executions/components/whatsapp/actions"
import {WHATSAPP_CHANNEL_NAME} from "@/inngest/channels/whatsapp"

type WhatsAppNodeData = {
  webhookUrl?: string;
  content?: string;
  username?: string;
};

type GeminiNodeType = Node<WhatsAppNodeData>;

export const WhatsAppNode = memo((props: NodeProps<GeminiNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {setNodes} = useReactFlow()
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: WHATSAPP_CHANNEL_NAME,
    topic: 'status',
    refreshToken: fetchWhatsAppRealtimeToken,
  });

  const handleOpenSettings=()=> setDialogOpen(true);

  const handleSubmit = (values: WhatsAppFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };


  const nodeData = props.data;
  const description = nodeData?.content
    ? `gemini-2.5-flash: ${nodeData.content.slice(0,50)}...`
    : "Not configured";

  return (
    <>
    <WhatsAppDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/whatsapp.svg"
        name="whatsapp"
        status={nodeStatus}
        nodeType="WHATSAPP"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

WhatsAppNode.displayName = "WhatsAppNodeData";

'use client'

import type { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useState } from "react";
import { DiscordDialog, DiscordFormValues } from "./dialog";
import { useReactFlow } from "@xyflow/react";
import {useNodeStatus} from '../../hooks/use-node-status'
import {fetchDiscordRealtimeToken} from "@/features/executions/components/discord/actions"
import {DISCORD_CHANNEL_NAME} from "@/inngest/channels/discord"

type DiscordNodeData = {
  webhookUrl?: string;
  content?: string;
  username?: string;
};

type GeminiNodeType = Node<DiscordNodeData>;

export const DiscordNode = memo((props: NodeProps<GeminiNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {setNodes} = useReactFlow()
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: DISCORD_CHANNEL_NAME,
    topic: 'status',
    refreshToken: fetchDiscordRealtimeToken,
  });

  const handleOpenSettings=()=> setDialogOpen(true);

  const handleSubmit = (values: DiscordFormValues) => {
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
    <DiscordDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/discord.svg"
        name="Discord"
        status={nodeStatus}
        nodeType="DISCORD"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

DiscordNode.displayName = "DiscordNodeData";
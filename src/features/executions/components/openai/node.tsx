'use client'

import type { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useState } from "react";
import { OpenAiDialog, OpenAiFormValues } from "./dialog";
import { useReactFlow } from "@xyflow/react";
import {useNodeStatus} from '../../hooks/use-node-status'
import {fetchOpenAiRealtimeToken} from "@/features/executions/components/openai/actions"
import {OPENAI_CHANNEL_NAME} from "@/inngest/channels/openai"

type OpenAiNodeData = {
  variableName?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

type OpenAiNodeType = Node<OpenAiNodeData>;

export const OpenAiNode = memo((props: NodeProps<OpenAiNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {setNodes} = useReactFlow()
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: OPENAI_CHANNEL_NAME,
    topic: 'status',
    refreshToken: fetchOpenAiRealtimeToken,
  });

  const handleOpenSettings=()=> setDialogOpen(true);

  const handleSubmit = (values: OpenAiFormValues) => {
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
  const description = nodeData?.userPrompt
    ? `gpt-4 ${nodeData.userPrompt.slice(0,50)}...`
    : "Not configured";

  return (
    <>
    <OpenAiDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/openai.svg"
        name="OpenAI"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

OpenAiNode.displayName = "OpenAiNode";
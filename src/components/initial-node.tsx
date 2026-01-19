"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo} from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkflowNode } from "@/components/workflow-node";
import { NodeSelector } from "@/components/node-selector";
import { useState } from "react";

export const InitialNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <WorkflowNode name="Initial node" description="Click to add a node">
          <PlaceholderNode {...props} onClick={()=> setSelectorOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center">
              <PlusIcon className="size-4" />
          </div>
          </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
});

InitialNode.displayName = "InitialNode";

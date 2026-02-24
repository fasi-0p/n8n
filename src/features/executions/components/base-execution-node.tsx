'use client';

import { type NodeProps, Position } from '@xyflow/react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { memo, type ReactNode } from 'react';
import { BaseHandle } from '@/components/react-flow/base-handle';
import { WorkflowNode } from '@/components/workflow-node';
import { useReactFlow } from '@xyflow/react';
import { type NodeStatus } from '@/components/react-flow/node-status-indicator';
import {
  NeonBaseNode, NeonNodeHeader, NeonNodeIcon,
  NeonNodeTitle, NeonNodeSubtitle, NeonStatusDot, NeonNodeBody,
} from '@/components/react-flow/neon-base-node';
import { type NodeAccentKey } from '@/lib/neon-theme';

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  nodeType?: NodeAccentKey;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(({
  id,
  icon: Icon,
  name,
  description,
  children,
  status = 'initial',
  nodeType,
  onSettings,
  onDoubleClick,
  selected,
}: BaseExecutionNodeProps) => {

  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes(ns => ns.filter(n => n.id !== id));
    setEdges(es => es.filter(e => e.source !== id && e.target !== id));
  };

  return (
    <WorkflowNode name={name} description={description} onDelete={handleDelete} onSettings={onSettings}>
      <NeonBaseNode status={status} nodeType={nodeType} selected={selected} onDoubleClick={onDoubleClick}>
        <NeonNodeHeader nodeType={nodeType} shimmer={selected}>
          <NeonNodeIcon nodeType={nodeType}>
            {typeof Icon === 'string'
              ? <Image src={Icon} alt={name} width={16} height={16} />
              : <Icon className="size-4 text-white" />
            }
          </NeonNodeIcon>

          <div className="flex-1 overflow-hidden">
            <NeonNodeTitle>{name}</NeonNodeTitle>
            {nodeType && <NeonNodeSubtitle>{nodeType}</NeonNodeSubtitle>}
          </div>

          <NeonStatusDot status={status} />
        </NeonNodeHeader>

        <NeonNodeBody>
          {description && !children && (
            <div className="text-[11px] font-mono-jetbrains text-zinc-500 truncate">
              {description}
            </div>
          )}
          {children}
        </NeonNodeBody>

        <BaseHandle id="target-1" type="target" position={Position.Left} />
        <BaseHandle id="source-1" type="source" position={Position.Right} />
      </NeonBaseNode>
    </WorkflowNode>
  );
});

BaseExecutionNode.displayName = 'BaseExecutionNode';

// "use client";

// import { type NodeProps, Position } from "@xyflow/react";
// import type { LucideIcon } from "lucide-react";
// import Image from "next/image";
// import { memo, type ReactNode, useCallback } from "react";
// import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
// import { BaseHandle } from "@/components/react-flow/base-handle";
// import { WorkflowNode } from "@/components/workflow-node";
// import { useReactFlow } from "@xyflow/react";
// import {type NodeStatus, NodeStatusIndicator } from "@/components/react-flow/node-status-indicator";

// interface BaseExecutionNodeProps extends NodeProps {
//   icon: LucideIcon | string;
//   name: string;
//   description?: string;
//   children?: ReactNode;
//   status?: NodeStatus; 
//   onSettings?: () => void;
//   onDoubleClick?: () => void;
// }

// export const BaseExecutionNode = memo(
//   ({
//     id,
//     icon: Icon,
//     name,
//     description,
//     children,
//     status='initial',
//     onSettings,
//     onDoubleClick,
//   }: BaseExecutionNodeProps) => {
//     const {setNodes, setEdges} = useReactFlow();
//     const handleDelete = () => {
//       setNodes((currentNodes) =>{
//         const updatedNodes = currentNodes.filter((node) => node.id!==id);
//         return updatedNodes;
//       })

//       setEdges((currentEdges)=>{
//         const updatedEdges = currentEdges.filter((edge)=> edge.source!==id && edge.target!==id);
//         return updatedEdges;
//       })
//     };

//     return (
//       <WorkflowNode
//         name={name}
//         description={description}
//         onDelete={handleDelete}
//         onSettings={onSettings}
//       >
//         <NodeStatusIndicator status={status} variant='border'>
//           <BaseNode status={status} onDoubleClick={onDoubleClick}>
//             <BaseNodeContent>
//               {typeof Icon === "string" ? (
//                 <Image src={Icon} alt={name} width={16} height={16} />
//               ) : (
//                 <Icon className="size-4 text-muted-foreground" />
//               )}

//               {children}

//               <BaseHandle id="target-1" type="target" position={Position.Left} />
//               <BaseHandle id="source-1" type="source" position={Position.Right} />
//             </BaseNodeContent>
//           </BaseNode>
//         </NodeStatusIndicator>
//       </WorkflowNode>
//     );
//   }
// );

// BaseExecutionNode.displayName="BaseExecutionNode";
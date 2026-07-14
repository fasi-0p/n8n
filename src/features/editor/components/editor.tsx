// "use client";
// import { ErrorView, LoadingView } from "@/components/entity-components";
// import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
// import { useState, useCallback, useMemo } from 'react';
// import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type Node, type Edge, type NodeChange, type EdgeChange, type Connection,
//   Background, Controls, MiniMap, Panel} from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { nodeComponents } from '@/config/node-components';
// import { AddNodeButton } from "@/features/editor/components/add-node-button";
// import {useSetAtom} from "jotai";
// import {editorAtom} from "@/features/editor/store/atoms";
// import {NodeType} from "@/generated/prisma";
// import {ExecuteWorkflowButton} from "@/features/editor/components/execute-workflow-button";

// export const EditorLoading = () => {
//   return <LoadingView message="Loading editor..." />
// };

// export const EditorError = () => {
//   return <ErrorView message="Error loading editor" />
// }

// export const Editor = ({ workflowId }: { workflowId: string }) => {
//   const { data: workflow } = useSuspenseWorkflow(workflowId); //wtf is this??

//   const setEditor = useSetAtom(editorAtom);
//   const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
//   const [edges, setEdges] = useState<Edge[]>(workflow.edges);
//   const onNodesChange = useCallback(
//     (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//     [],
//   );
//   const onEdgesChange = useCallback(
//     (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//     [],
//   );
//   const onConnect = useCallback(
//     (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
//     [],
//   );

//   const hasManualTrigger = useMemo(()=>{
//     return nodes.some((node)=> node.type === NodeType.MANUAL_TRIGGER)
//   }, [nodes])

//   return (
//     <div className='size-full'>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeComponents}
//         onInit={setEditor}
//         fitView
//         snapGrid={[10,10]}
//         snapToGrid
//         panOnScroll
//         panOnDrag={false}
//         selectionOnDrag
//         proOptions={{hideAttribution: true}}
//       >
//         <Background/>
//         <Controls/>
//         <MiniMap/>
//         <Panel
//           position='top-right'>
//           <AddNodeButton/>
//         </Panel>
//         {hasManualTrigger && (
//           <Panel
//             position='bottom-center'>
//               <ExecuteWorkflowButton workflowId={workflowId}/>
//           </Panel>
//         )}
//       </ReactFlow>
//     </div>
//   )
// }

'use client';

import { ErrorView, LoadingView } from '@/components/entity-components';
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflows';
import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  applyNodeChanges, applyEdgeChanges, addEdge,
  type Node, type Edge, type NodeChange, type EdgeChange, type Connection,
  Background, BackgroundVariant, Controls, MiniMap, Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeComponents } from '@/config/node-components';
import { AddNodeButton } from '@/features/editor/components/add-node-button';
import { useSetAtom } from 'jotai';
import { editorAtom } from '@/features/editor/store/atoms';
import { NodeType } from '@/generated/prisma';
import { ExecuteWorkflowButton } from '@/features/editor/components/execute-workflow-button';

export const EditorLoading = () => <LoadingView message="Loading editor..." />;
export const EditorError   = () => <ErrorView  message="Error loading editor" />;

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  const setEditor = useSetAtom(editorAtom);
  const [nodes, setNodes] = useState<Node[]>(() =>
  workflow.nodes.map(({ measured, width, height, ...node }: any) => node)
  );
  const [edges, setEdges] = useState<Edge[]>(() =>
    workflow.edges.map(({ selected, ...edge }: any) => edge)
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes(snap => applyNodeChanges(changes, snap)), [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges(snap => applyEdgeChanges(changes, snap)), [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(snap => addEdge({ ...params, animated: true }, snap)), [],
  );

  const hasManualTrigger = useMemo(
    () => nodes.some(n => n.type === NodeType.MANUAL_TRIGGER),
    [nodes],
  );

  return (
    <div className="size-full neon-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        onInit={setEditor}
        fitView
        fitViewOptions={{ padding: 0.2 }}   // ← ADD: gives breathing room when fitting
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ animated: true }}  // ← ADD: edges animate by default
      >
        {/* Dot-grid background — matches NeonGrid blueprint spec */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.6}
          color="#334155"
          style={{ backgroundColor: '#0f172a' }}
        />

        {/* Controls — styled via globals.css overrides below */}
        <Controls
          className="!bg-[#1e293b] !border-[#334155] !shadow-none [&>button]:!bg-[#1e293b] [&>button]:!border-[#334155] [&>button]:!text-slate-400 [&>button:hover]:!bg-[#334155] [&>button:hover]:!text-white"
        />

        {/* MiniMap — NeonGrid dark theme */}
        <MiniMap
          className="!bg-[#0f172a]/60 !border !border-[#334155] !rounded-lg"
          nodeColor={(node) => {
            const aiTypes = ['ANTHROPIC', 'GEMINI', 'OPENAI'];
            if (aiTypes.includes(node.type ?? '')) return '#8b5cf6';
            if (['MANUAL_TRIGGER', 'GOOGLE_FORM_TRIGGER', 'STRIPE_TRIGGER'].includes(node.type ?? '')) return '#38bdf8';
            return '#475569';
          }}
          maskColor="rgba(15,23,42,0.6)"
        />

        <Panel position="top-right">
          <AddNodeButton />
        </Panel>

        {hasManualTrigger && (
          <Panel position="bottom-center">
            <ExecuteWorkflowButton workflowId={workflowId} />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};
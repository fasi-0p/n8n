'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SaveIcon, FlaskConicalIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
  useUpdateWorkflow,
} from "@/features/workflows/hooks/use-workflows";
import { useAtomValue } from "jotai";
import { editorAtom } from "@/features/editor/store/atoms";

// ── Save button ───────────────────────────────────────────────────────────────
export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflow();

  // const handleSave = () => {
  //   if (!editor) return;
  //   saveWorkflow.mutate({
  //     id: workflowId,
  //     nodes: editor.getNodes(),
  //     edges: editor.getEdges(),
  //   });
  // };
  const handleSave = () => {
  if (!editor) return;

  // Strip React Flow internal measurement properties before saving.
  // If these are persisted, nodes reload at the wrong size.
  const rawNodes = editor.getNodes().map(({ measured, width, height, selected, dragging, ...node }) => node);
  const rawEdges = editor.getEdges().map(({ selected, ...edge }) => edge);

  saveWorkflow.mutate({
    id: workflowId,
    nodes: rawNodes,
    edges: rawEdges,
  });
};

  return (
    <button
      onClick={handleSave}
      disabled={saveWorkflow.isPending}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                 bg-[rgba(56,189,248,0.1)] text-[#38bdf8] border border-[rgba(56,189,248,0.4)]
                 shadow-[0_0_12px_rgba(56,189,248,0.15)]
                 hover:bg-[rgba(56,189,248,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
                 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
    >
      <SaveIcon className="size-4" />
      {saveWorkflow.isPending ? "Saving…" : "Save"}
    </button>
  );
};

// ── Breadcrumbs ───────────────────────────────────────────────────────────────
export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-zinc-400" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link prefetch href="/workflows" className="hover:text-white transition-colors">
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-zinc-700" />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// ── Editable workflow name ────────────────────────────────────────────────────
export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflow = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) setName(workflow.name);
  }, [workflow.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (updateWorkflow.isPending) return;
    if (name === workflow.name) { setIsEditing(false); return; }
    try {
      await updateWorkflow.mutateAsync({ id: workflowId, name });
    } catch {
      setName(workflow.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") { setName(workflow.name); setIsEditing(false); }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={name}
        disabled={updateWorkflow.isPending}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-7 px-2 bg-[#0f172a] border border-[rgba(56,189,248,0.4)] rounded-md
                   text-[#38bdf8] text-sm outline-none font-mono
                   focus:ring-1 focus:ring-[rgba(56,189,248,0.3)]"
        style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: "120px" }}
      />
    );
  }

  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer text-white hover:text-[#38bdf8] transition-colors"
    >
      {workflow.name}
    </BreadcrumbItem>
  );
};

// ── Actions ───────────────────────────────────────────────────────────────────
export const EditorActions = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <EditorSaveButton workflowId={workflowId} />
    </div>
  );
};

// ── Header shell ──────────────────────────────────────────────────────────────
export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-3 px-4 border-b"
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #334155",
      }}
    >
      <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-white/5 transition-colors" />

      <div className="w-px h-5 bg-zinc-800 shrink-0" />

      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorActions workflowId={workflowId} />
      </div>
    </header>
  );
};

// 'use client'

// import { Button } from "@/components/ui/button";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { SaveIcon } from "lucide-react";
// import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,} from "@/components/ui/breadcrumb";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useSuspenseWorkflow, useUpdateWorkflowName, useUpdateWorkflow } from "@/features/workflows/hooks/use-workflows";
// import { Input } from "@/components/ui/input";
// import { useAtomValue } from "jotai";
// import { editorAtom } from "@/features/editor/store/atoms";

// export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
//   const editor = useAtomValue(editorAtom);
//   const saveWorkflow = useUpdateWorkflow()

//   const handleSave = ()=>{
//     if (!editor){
//       return;
//     }

//     const nodes=editor.getNodes();
//     const edges=editor.getEdges();

//     saveWorkflow.mutate({
//       id: workflowId,
//       nodes,
//       edges
//     });

//   }

//   return (
//     <div className="ml-auto">
//       <Button size="sm" onClick={handleSave} disabled={saveWorkflow.isPending}>
//         <SaveIcon className="size-4" />
//         Save
//       </Button>
//     </div>
//   );
// };

// export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link prefetch href="/workflows">
//               Workflows
//             </Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>

//         <BreadcrumbSeparator />

//         <EditorNameInput workflowId={workflowId} />
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

// // temp
// export const EditorActions = ({ workflowId }: { workflowId: string }) => {
//   return (
//     <div className="flex items-center gap-2 ml-auto">
//       <EditorSaveButton workflowId={workflowId} />
//     </div>
//   );
// };

// export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
//   const { data: workflow } = useSuspenseWorkflow(workflowId);
//   const updateWorkflow = useUpdateWorkflowName();

//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(workflow.name);

//   const inputRef = useRef<HTMLInputElement>(null);

//   // keep local state in sync when workflow changes
//   useEffect(() => {
//     if (workflow.name) setName(workflow.name);
//   }, [workflow.name]);

//   // focus input whenever edit mode turns on
//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       inputRef.current.focus();
//       inputRef.current.select();
//     }
//   }, [isEditing]);

//   const handleSave = async () => {
//     // don't allow saving while request is running
//     if (updateWorkflow.isPending) return;

//     // if unchanged, just exit edit mode
//     if (name === workflow.name) {
//       setIsEditing(false);
//       return;
//     }

//     try {
//       await updateWorkflow.mutateAsync({
//         id: workflowId,
//         name,
//       });
//     } catch {
//       // revert on error
//       setName(workflow.name);
//     } finally {
//       setIsEditing(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSave();
//     } else if (e.key === "Escape") {
//       setName(workflow.name);
//       setIsEditing(false);
//     }
//   };

//   if (isEditing) {
//     return (
//       <Input
//         disabled={updateWorkflow.isPending}
//         ref={inputRef}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         onBlur={handleSave}
//         onKeyDown={handleKeyDown}
//         className="h-7 w-auto min-w-[100px] px-2"
//       />
//     );
//   }

//   return (
//     <BreadcrumbItem
//       onClick={() => setIsEditing(true)}
//       className="cursor-pointer hover:text-foreground transition-colors"
//     >
//       {workflow.name}
//     </BreadcrumbItem>
//   );
// };

// export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
//   return (
//     <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
//       <SidebarTrigger />
//       <div className="flex flex-row items-center justify-between gap-x-4 w-full">
//         <EditorBreadcrumbs workflowId={workflowId} />
//         <EditorActions workflowId={workflowId} />
//       </div>
//     </header>
//   );
// };

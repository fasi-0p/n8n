'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Settings2Icon, Trash2Icon } from 'lucide-react';

interface WorkflowNodeProps {
  name: string;
  description?: string;
  children: ReactNode;
  onDelete?: () => void;
  onSettings?: () => void;
}

export function WorkflowNode({
  name,
  description,
  children,
  onDelete,
  onSettings,
}: WorkflowNodeProps) {
  return (
    <div className="group relative">
      {/* Action buttons — appear on hover */}
      <div className="absolute -top-8 right-0 hidden group-hover:flex items-center gap-1 z-10 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-4">
        {onSettings && (
          <button
            onClick={onSettings}
            className="p-1.5 rounded-md bg-[#1e293b] border border-[#334155]
                       text-slate-400 hover:text-[#38bdf8] hover:border-[#38bdf8] transition-all"
            title="Configure"
          >
            <Settings2Icon className="size-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-md bg-[#1e293b] border border-[#334155]
                       text-slate-400 hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.4)]
                       hover:bg-[rgba(244,63,94,0.1)] transition-all"
            title="Delete node"
          >
            <Trash2Icon className="size-3" />
          </button>
        )}
      </div>

      {/* Node label above */}
      {(name || description) && (
        <div className="absolute -top-6 left-0 flex flex-col" style={{ pointerEvents: 'none' }}>
          {description && (
            <span className="text-[10px] text-slate-400 font-mono-jetbrains truncate max-w-[200px]">
              {description}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

// "use client";

// import { NodeToolbar, Position } from "@xyflow/react";
// import { SettingsIcon, TrashIcon } from "lucide-react";
// import type { ReactNode } from "react";
// import { Button } from "./ui/button";

// interface WorkflowNodeProps {
//   children: ReactNode;
//   showToolbar?: boolean;
//   onDelete?: () => void;
//   onSettings?: () => void;
//   name?: string;
//   description?: string;
// }

// export function WorkflowNode({
//   children,
//   showToolbar = true,
//   onDelete,
//   onSettings,
//   name,
//   description,
// }: WorkflowNodeProps) {
//   return (
//     <>
//       {showToolbar && (
//         <NodeToolbar>
//           <Button size="sm" variant="ghost" onClick={onSettings}>
//             <SettingsIcon className="size-4" />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onDelete}>
//             <TrashIcon className="size-4" />
//           </Button>
//         </NodeToolbar>
//       )}

//       {children}

//       {name && (
//         <NodeToolbar
//           position={Position.Bottom}
//           isVisible
//           className="max-w-[200px] text-center"
//         >
//           <p className="font-medium">{name}</p>

//           {description && (
//             <p className="text-muted-foreground truncate text-sm">
//               {description}
//             </p>
//           )}
//         </NodeToolbar>
//       )}
//     </>
//   );
// }

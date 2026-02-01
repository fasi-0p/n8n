"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitiveRaw from "react-resizable-panels"
const ResizablePrimitive = ResizablePrimitiveRaw as any

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                               Panel Group                                  */
/* -------------------------------------------------------------------------- */

type PanelGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  direction?: "horizontal" | "vertical"
}

function ResizablePanelGroup({ className, ...props }: PanelGroupProps) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...(props as any)}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Panel                                     */
/* -------------------------------------------------------------------------- */

type PanelProps = {
  children?: React.ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

function ResizablePanel(props: PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...(props as any)} />
}

/* -------------------------------------------------------------------------- */
/*                                Resize Handle                               */
/* -------------------------------------------------------------------------- */

type ResizeHandleProps = React.ComponentPropsWithoutRef<"div"> & {
  withHandle?: boolean
}

function ResizableHandle({ withHandle, className, ...props }: ResizeHandleProps) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...(props as any)}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export const AppHeader = () => {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-3 px-4 border-b"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #27272a",
      }}
    >
      {/* Sidebar toggle */}
      <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-white/5 transition-colors" />

      <Separator orientation="vertical" className="h-5 bg-zinc-800" />

      {/* Breadcrumb slot — children injected by page-level layouts */}
      <div className="flex-1 flex items-center gap-2 text-sm font-medium text-zinc-400"
           style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {/* Breadcrumb content rendered by child layouts */}
      </div>
    </header>
  )
}

// import { SidebarTrigger } from "@/components/ui/sidebar"

// export const AppHeader = () => {
//   return (
//     <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
//       <SidebarTrigger />
//     </header>
//   )
// }

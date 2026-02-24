import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/*
        bg-[#09090b]  → obsidian canvas base
        Removed bg-accent/20 which was adding a grey wash over the dark canvas
      */}
      <SidebarInset className="bg-[#09090b] text-white min-h-screen">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout

// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
// import {AppSidebar} from '@/components/app-sidebar'

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset className="bg-accent/20">
//         {children}
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }

// export default Layout

"use client"

import React from "react"
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription"
import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Workflows",   icon: FolderOpenIcon, url: "/workflows" },
      { title: "Credentials", icon: KeyIcon,         url: "/credentials" },
      { title: "Executions",  icon: HistoryIcon,     url: "/executions" },
    ],
  },
]

export const AppSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-[#09090b]"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid #27272a",
      }}
    >
      {/* ── Logo / Brand ── */}
      <SidebarHeader className="border-b border-zinc-800 pb-3 pt-3">
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton asChild className="gap-x-3 h-10 px-3 hover:bg-transparent">
            <Link href="/" prefetch>
              <Image src="/logos/logo.svg" alt="Nodebase" width={28} height={28} />
              <span
                className="font-semibold text-sm tracking-wide"
                style={{
                  color: "#00f0ff",
                  textShadow: "0 0 10px rgba(0,240,255,0.6)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Nodebase
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent className="pt-2">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        asChild
                        className={cn(
                          "gap-x-3 h-10 px-3 rounded-md transition-all duration-150",
                          "text-zinc-400 hover:text-white hover:bg-white/5",
                          // Active state: cyan left border + subtle glow
                          isActive && [
                            "!text-[#00f0ff]",
                            "!bg-[rgba(0,240,255,0.06)]",
                            "border-l-2 border-l-[#00f0ff]",
                            "rounded-l-none",
                          ]
                        )}
                      >
                        <Link href={item.url} prefetch>
                          <item.icon
                            className={cn(
                              "size-4",
                              isActive ? "text-[#00f0ff]" : "text-zinc-500"
                            )}
                          />
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="border-t border-zinc-800 pt-2">
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                className="gap-x-3 h-10 px-3 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all"
                onClick={() => authClient.checkout({ slug: "n8n-pro" })}
              >
                <StarIcon className="size-4" />
                <span className="text-sm">Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-3 h-10 px-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className="size-4" />
              <span className="text-sm">Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="gap-x-3 h-10 px-3 text-zinc-400 hover:text-[#ff003c] hover:bg-[rgba(255,0,60,0.06)] transition-all"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: { onSuccess: () => router.push("/login") },
                })
              }
            >
              <LogOutIcon className="size-4" />
              <span className="text-sm">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
// "use client"

// import React from "react"
// import {
//   CreditCardIcon,
//   FolderOpenIcon,
//   HistoryIcon,
//   KeyIcon,
//   LogOutIcon,
//   StarIcon,
// } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import {authClient} from '@/lib/auth-client'
// import {useHasActiveSubscription} from "@/features/subscriptions/hooks/use-subscription"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// const menuItems = [
//   {
//     title: "Main",
//     items: [
//       {
//         title: "Workflows",
//         icon: FolderOpenIcon,
//         url: "/workflows",
//       },
//       {
//         title: "Credentials",
//         icon: KeyIcon,
//         url: "/credentials",
//       },
//       {
//         title: "Executions",
//         icon: HistoryIcon,
//         url: "/executions",
//       },
//     ],
//   },
// ]

// export const AppSidebar = () => {
//   const pathname = usePathname()
//   const router = useRouter()
//   const {hasActiveSubscription, isLoading}=useHasActiveSubscription();
//   // console.log("SUB CHECK:", { hasActiveSubscription, isLoading }) //testing

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader>
//         <SidebarMenuItem>
//           <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
//             <Link href="/" prefetch>
//               <Image
//                 src="/logos/logo.svg"
//                 alt="Nodebase"
//                 width={30}
//                 height={30}
//               />
//               <span className="font-semibold text-sm">Nodebase</span>
//             </Link>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       </SidebarHeader>


//       <SidebarContent>
//         {menuItems.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupContent>
//                 <SidebarMenu>
//                     {group.items.map((item) => (
//                         <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton
//                             tooltip={item.title}
//                             isActive={
//                                 item.url==="/"
//                                 ? pathname==="/"
//                                 : pathname.startsWith(item.url)
//                             }
//                             asChild
//                             className="gap-x-4 h-10 px-4"
//                         >
//                             <Link href={item.url} prefetch>
//                             <item.icon className="size-4" />
//                             <span>{item.title}</span>
//                             </Link>
//                         </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           {!hasActiveSubscription && ! isLoading && (
//               <SidebarMenuItem>
//                   <SidebarMenuButton
//                       tooltip="Upgrade to Pro"
//                       className="gap-x-4 h-10 px-4"
//                       onClick={() => authClient.checkout({slug:"n8n-pro"})}
//                   >
//                       <StarIcon className="h-4 w-4" />
//                       <span>Upgrade to Pro</span>
//                   </SidebarMenuButton>
//               </SidebarMenuItem>
//           )}

//             <SidebarMenuItem>
//                 <SidebarMenuButton
//                     tooltip="Billing Portal"
//                     className="gap-x-4 h-10 px-4"
//                     onClick={() => authClient.customer.portal()}
//                 >
//                     <CreditCardIcon className="h-4 w-4" />
//                     <span>Billing Portal</span>
//                 </SidebarMenuButton>
//             </SidebarMenuItem>

//             <SidebarMenuItem>
//                 <SidebarMenuButton
//                     tooltip="Sign out"
//                     className="gap-x-4 h-10 px-4"
//                     onClick={() => authClient.signOut({
//                         fetchOptions:{
//                             onSuccess: ()=> {
//                                 router.push("/login");
//                             },
//                         }
//                     })}
//                 >
//                     <LogOutIcon className="h-4 w-4" />
//                     <span>Sign out</span>
//                 </SidebarMenuButton>
//             </SidebarMenuItem>
//         </SidebarMenu>
//         </SidebarFooter>

//     </Sidebar>
//   )
// }

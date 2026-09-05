import {
  CreditCard,
  Edit,
  History,
  Settings,
  Sparkles,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

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
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const chatHistory = [
  "Landing page redesign generator",
  "E-commerce checkout flow",
  "Dashboard analytics widgets",
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      {/* Header */}
      <SidebarHeader className="gap-3 p-3">
        <div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          {/* Logo */}
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>

          {/* App name */}
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Sandbox
          </span>

          {/* Sidebar toggle */}
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
        </div>

        {/* New Chat */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="New Chat"
              className="h-9 bg-purple-800 text-white hover:bg-purple-700 hover:text-white"
            >
              <Edit className="size-4" />

              <span className="group-data-[collapsible=icon]:hidden">
                New Chat
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Chat History */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat, index) => (
                <SidebarMenuItem key={chat}>
                  <SidebarMenuButton
                    isActive={index === 0}
                    tooltip={chat}
                  >
                    {/* Chat icon */}
                    <History className="size-4 shrink-0" />

                    {/* Chat title */}
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {chat}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-0 p-3">
        <SidebarSeparator className="mb-3" />

        <SidebarMenu>
          {/* Credits */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Credits"
              size="lg"
              className="group-data-[collapsible=icon]:justify-center"
            >
              <CreditCard className="size-4 shrink-0" />

              <span className="flex flex-1 flex-col items-start gap-0.5 group-data-[collapsible=icon]:hidden">
                <span>Credits remaining</span>

                <span className="text-xs text-sidebar-foreground/60">
                  128 credits
                </span>
              </span>

              <Settings className="size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>


          <SidebarMenuItem className="mt-2 flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonBox:
                    "group-data-[collapsible=icon]:size-8",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


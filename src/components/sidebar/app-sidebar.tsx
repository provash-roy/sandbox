import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Coins, Edit, MessageSquare, Sparkles } from "lucide-react";

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
import { Button } from "../ui/button";

const chatHistory = [
  "Landing page redesign generator",
  "E-commerce checkout flow",
  "Dashboard analytics widgets",
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="gap-3 p-3">
        <div className="flex items-center justify-center px-2 py-1">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground group-data-[collapsible=icon]:hidden">
            <Sparkles className="size-4" />
          </div>

          <span className="ml-2 font-semibold group-data-[collapsible=icon]:hidden">
            Sandbox
          </span>

          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:mx-auto" />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="New Chat"
              className="h-9 bg-purple-800 text-white hover:bg-purple-700 hover:text-white"
            >
              <Edit className="size-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                New Chat
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground group-data-[collapsible=icon]:justify-center">
          <MessageSquare className="size-4 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Chats</span>
        </div>

        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat, index) => (
                <SidebarMenuItem key={chat}>
                  <SidebarMenuButton isActive={index === 0}>
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

      <SidebarFooter className="gap-0 p-3">
        <SidebarSeparator className="mb-3" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Credits"
              size="lg"
              className="group-data-[collapsible=icon]:justify-center"
            >
              <Coins className="size-4 shrink-0" />

              <span className="flex-1 group-data-[collapsible=icon]:hidden">
                Credits
              </span>

              <span className="group-data-[collapsible=icon]:hidden">10 $</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="mt-2 flex items-center justify-center">
            <Show when="signed-out">
              <div className="flex w-full gap-2 group-data-[collapsible=icon]:justify-center">
                <SignInButton>
                  <Button
                    className="
                      flex-1
                      bg-purple-900
                      text-white
                      hover:bg-purple-600
                      group-data-[collapsible=icon]:size-8
                      group-data-[collapsible=icon]:flex-none
                      group-data-[collapsible=icon]:p-0
                    "
                  >
                    <span className="group-data-[collapsible=icon]:hidden">
                      Sign In
                    </span>
                    <span className="hidden group-data-[collapsible=icon]:block">
                      <UserButton />
                    </span>
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="flex-1 bg-purple-900 text-white hover:bg-purple-600 group-data-[collapsible=icon]:hidden">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex w-full items-center justify-start">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox:
                        "justify-end group-data-[collapsible=icon]:justify-center",
                      userButtonOuterIdentifier:
                        "group-data-[collapsible=icon]:hidden",
                    },
                  }}
                  showName
                />
              </div>
            </Show>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

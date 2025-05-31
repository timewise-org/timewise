import * as React from "react";
import { Command, Calendar, Table2, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";

// This is sample data
const data = {
  navMain: [
    {
      title: "Plans",
      url: "/",
      icon: Table2,
      isActive: true,
    },
    {
      title: "Schedules",
      url: "/schedules",
      icon: Calendar,
      isActive: false,
    },
  ],
  classes: [
    {
      code: "COP3503",
      name: "Programming Fundamentals 1",
      professor: "Jill Goslinga",
      credits: 3,
      time: "M,W,F (11:45 AM - 12:35 PM)",
    },
    {
      code: "COP3503",
      name: "Programming Fundamentals 1",
      professor: "Jill Goslinga",
      credits: 3,
      time: "M,W,F (11:45 AM - 12:35 PM)",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        side="left"
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Timewise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        navigate({ to: item.url });
                      }}
                      // isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar side="left" collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            {/* <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div> */}
          </div>
          <SidebarInput placeholder="Type to search..." />
          <Button size="sm">
            <Search /> Search
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-1">
            <SidebarGroupContent>
              {data.classes.map((c) => (
                <div
                  className="flex items-start justify-between bg-gray-200 p-2 rounded-md mb-2 relative"
                  key={c.code}
                  style={{
                    minHeight: "100px",
                  }}
                >
                  <div>
                    <div className="flex items-center italic">
                      <p className="text-sm ">{c.code}</p>
                      <p className="px-2">|</p>
                      <p className="text-sm">{c.professor}</p>
                    </div>
                    <p className="py-2">{c.name}</p>
                    <p>{c.time}</p>
                  </div>
                  <div className="absolute right-2 top-1">
                    <p className="text-sm font-bold text-right py-1">
                      Credits: {c.credits}
                    </p>
                  </div>
                  <div className="text-sm flex justify-end pb-1 absolute right-2 bottom-2">
                    <Button size="sm">+ Add</Button>
                  </div>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}

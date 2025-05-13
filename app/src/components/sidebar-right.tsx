import * as React from "react";

import { Sidebar } from "@/components/ui/sidebar";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      // className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row hidden xl:block"
      className="sticky hidden xl:flex top-0 h-svh border-l"
      customSide="right"
      {...props}
    ></Sidebar>
  );
}

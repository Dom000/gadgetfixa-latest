import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full  !bg-gray-50 ">
      <AppSidebar />
      <div className="w-full  p-1 md:p-2">{children}</div>
    </div>
  );
}

export default FeedLayout;

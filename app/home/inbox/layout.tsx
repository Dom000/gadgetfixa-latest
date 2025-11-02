import MessageSideBar from "@/components/inbox/MessageSideBar";
import { AppSidebar } from "@/components/SideBar";
import React from "react";

function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-gray-50">
      <div className="w-full md:flex relative md:w-[calc(100vw-240px)] p-1 md:p-2">
        <MessageSideBar />
        {children}
      </div>
    </div>
  );
}

export default InboxLayout;

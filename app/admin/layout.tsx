import { AppSidebar } from "@/components/SideBar";
import React from "react";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full justify-between relative bg-gray-50">
      <AppSidebar />
      <div className="w-full md:w-[calc(100vw-240px)] p-1 md:p-2">{children}</div>
    </div>
  );
}

export default AdminLayout;

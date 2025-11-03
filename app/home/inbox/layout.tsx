import BreadCrumb from "@/components/CustomBreadcrumb";
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
      {" "}
      <BreadCrumb page="Messages" />
      <div className="my-5 bg-gray-50  max-w-3xl ">
        <p className="text-sm text-gray-600">
          Manage your conversations and stay connected with your clients.
        </p>
      </div>
      <div className="w-full md:flex relative md:w-[calc(100vw-240px)] p-1 md:p-2">
        <MessageSideBar />
        {children}
      </div>
    </div>
  );
}

export default InboxLayout;

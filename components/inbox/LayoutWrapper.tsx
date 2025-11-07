"use client";
import React from "react";
import MessageSideBar from "./MessageSideBar";
import { useAppStore } from "@/stores/store";
import { ChatView } from "@/types";

function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentView = useAppStore((state) => state.chatCurrentView);
  return (
    <>
      {" "}
      <div className="w-full flex md:hidden relative lg:w-[calc(100vw-240px)] p-1 md:p-2">
        {currentView == ChatView.INBOX ? <MessageSideBar /> : children}
      </div>{" "}
      <div className="w-full hidden md:flex  relative lg:w-[calc(100vw-240px)] p-1 md:p-2">
        <MessageSideBar /> {children}
      </div>
    </>
  );
}

export default LayoutWrapper;

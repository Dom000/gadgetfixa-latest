"use client";
import React from "react";
import MessageCard from "./MessageCard";
import { useQuery } from "@tanstack/react-query";
import { getInboxesByUserId } from "@/controllers/message/index.controller";
import { useAppStore } from "@/stores/store";

const messages = [
  {
    id: "1",
    name: "John Doe",
    content: "Hello, how are you?",
    timestamp: "2024-06-01 10:00 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    content: "Meeting at 3 PM",
    timestamp: "2024-06-01 11:30 AM",
  },
  {
    id: "3",
    name: "Bob Johnson",
    content: "Project update needed",
    timestamp: "2024-06-01 01:15 PM",
  },
  {
    id: "4",
    name: "Alice Brown",
    content: "Let's catch up tomorrow",
    timestamp: "2024-06-01 02:45 PM",
  },
  {
    id: "5",
    name: "Charlie Davis",
    content: "New project proposal",
    timestamp: "2024-06-01 04:20 PM",
  },
];
function MessageSideBar() {
  const user = useAppStore((state) => state.userDetails);

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getInboxesByUserId(user.id),
    refetchInterval: 5000,
  });

  return (
    <div className="bg-primary/5 w-full lg:w-96 h-[90vh] rounded-tl pt-5 rounded-bl overflow-y-auto">
      {messages && messages.data.length > 0 ? (
        messages.data.map((message) => <MessageCard key={message.id} {...message} />)
      ) : (
        <p className="text-gray-500 text-sm p-2">No messages found</p>
      )}{" "}
    </div>
  );
}

export default MessageSideBar;

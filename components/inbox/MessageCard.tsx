"use client";
import { useAppStore } from "@/stores/store";
import { ChatView, Inbox, MessageInbox } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function MessageCard(message: Inbox) {
  const userDetails = useAppStore((state) => state.userDetails);
  const router = useRouter();

  const setChatCurrentView = useAppStore((state) => state.setChatCurrentView);

  const nameBasedOnUser =
    message.user1.id === userDetails.id
      ? message.user2.fullName
      : message.user1.fullName;

  const handleClick = () => {
    router.push(
      `/home/inbox?user1=${message.user1.id}&user2=${message.user2.id}`
    );
    setChatCurrentView(ChatView.CHAT);
  };
  return (
    <div
      onClick={handleClick}
      className="flex space-x-2  hover:bg-primary/10 cursor-pointer! border-b text-xs p-2 "
    >
      <div className="">
        <Image
          src={`https://avatar.vercel.sh/${encodeURIComponent(
            nameBasedOnUser
          )}.svg?text=${encodeURIComponent(
            nameBasedOnUser.charAt(0).toUpperCase()
          )}`}
          alt={nameBasedOnUser}
          className="rounded"
          width={40}
          height={40}
        />
      </div>
      <div className="space-y-2 ">
        <h3 className="text-gray-800 font-bold">{nameBasedOnUser}</h3>
        <p className="text-gray-600">
          {message.messages[0].content.length > 30
            ? message.messages[0].content.substring(0, 30) + "..."
            : message.messages[0].content}
        </p>
      </div>{" "}
      <div className="flex items-start ml-auto flex-col text-right">
        {" "}
        <time className="text-gray-500 text-xs">
          {new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
}

export default MessageCard;

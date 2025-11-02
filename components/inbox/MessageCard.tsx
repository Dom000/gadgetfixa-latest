"use client";
import Image from "next/image";
import React from "react";

function MessageCard(message: {
  id: string;
  name: string;
  content: string;
  timestamp: string;
}) {
  return (
    <div className="flex space-x-2  hover:bg-primary/10 cursor-pointer! border-b text-xs p-2 ">
      <div className="">
        <Image
          src={`https://avatar.vercel.sh/${encodeURIComponent(
            message.name
          )}.svg?text=${encodeURIComponent(
            message.name.charAt(0).toUpperCase()
          )}`}
          alt={message.name}
          className="rounded"
          width={40}
          height={40}
        />
      </div>
      <div className="space-y-2 ">
        <h3 className="text-gray-800 font-bold">{message.name}</h3>
        <p className="text-gray-600">
          {message.content.length > 30
            ? message.content.substring(0, 30) + "..."
            : message.content}
        </p>
      </div>{" "}
      <div className="flex items-start ml-auto flex-col text-right">
        {" "}
        <time className="text-gray-500 text-xs">
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
}

export default MessageCard;

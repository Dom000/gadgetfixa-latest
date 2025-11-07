"use client";
import { useState, useRef, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { MessageInbox } from "@/types";
import { useAppStore } from "@/stores/store";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/controllers/message/index.controller";

const MessageList = ({
  messages,
  refetch,
}: {
  messages: MessageInbox[];
  refetch: () => void;
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = useAppStore((state) => state.userDetails?.id || "");
  const currentUsername = useAppStore(
    (state) => state.userDetails?.fullName || ""
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { mutate: sendMessageMutation, isPending: isSendingMessage } =
    useMutation({
      mutationFn: sendMessage,
      onSuccess: () => {
        refetch();
        scrollToBottom();
        setNewMessage("");
      },
    });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation({
        content: newMessage,
        senderId: currentUserId,
        receiverId:
          messages[0]?.receiver.id === currentUserId
            ? messages[0]?.sender.id
            : messages[0]?.receiver.id,
      });
    }
  };

  return (
    <div className="flex w-full flex-col relative h-full">
      {/* Messages Container */}

      <div className="flex-1 overflow-y-auto  space-y-4 max-h-96">
        {messages
          .slice()
          .reverse()
          .map((message) => {
            const isCurrentUser = message.sender.id === currentUserId;
            return (
              <div
                key={message.id}
                className={`flex space-x-2 ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                {" "}
                <div className="">
                  <Image
                    src={`https://avatar.vercel.sh/${encodeURIComponent(
                      !isCurrentUser ? message.sender.fullName : "You"
                    )}.svg?text=${encodeURIComponent(
                      !isCurrentUser
                        ? message.sender.fullName.charAt(0).toUpperCase()
                        : currentUsername.charAt(0).toUpperCase()
                    )}`}
                    alt={
                      !isCurrentUser ? message.sender.fullName : currentUsername
                    }
                    className="rounded mt-1"
                    width={30}
                    height={30}
                  />
                </div>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p
                    className={
                      (isCurrentUser ? "text-muted-foreground" : "text-black") +
                      " font-bold mb-1 text-sm"
                    }
                  >
                    {!isCurrentUser ? message.sender.fullName : "You"}
                  </p>
                  <p className="text-xs">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t absolute bottom-0 p-4 w-full">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            disabled={isSendingMessage || newMessage.trim() === ""}
            variant={"hero"}
            onClick={handleSendMessage}
            size="sm"
          >
            <Send className="w-4 h-4" /> Send{" "}
            {isSendingMessage && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageList;

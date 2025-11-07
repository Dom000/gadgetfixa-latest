"use client";
import { ArrowLeft, ArrowUpRightIcon, MessageCircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useSearchParams } from "next/navigation";
import { getMessagesBetweenUsers } from "@/controllers/message/index.controller";
import { useQuery } from "@tanstack/react-query";
import MessageList from "@/components/inbox/MessageList";
import { useAppStore } from "@/stores/store";
import { ChatView } from "@/types";

function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircleOff />
        </EmptyMedia>
        <EmptyTitle>No Messages Opened Yet</EmptyTitle>
        <EmptyDescription>
          You have not opened any messages. Click the button below to start a
          new conversation.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function page() {
  const searchParams = useSearchParams();
  const user1 = searchParams.get("user1") as string;
  const user2 = searchParams.get("user2") as string;
  const goback = useAppStore((state) => state.setChatCurrentView);
  const { data: messages, refetch } = useQuery({
    queryKey: ["messages", user1, user2],
    queryFn: () => getMessagesBetweenUsers(user1, user2),
    refetchInterval: 5000,
  });

  const handleGoback = () => {
    goback(ChatView.INBOX);
  };
  return (
    <>
      {" "}
      <div className="mb-2 md:hidden">
        <Button
          onClick={handleGoback}
          className="rounded-full"
          size={"icon"}
          variant={"hero"}
        >
          <ArrowLeft />
        </Button>
      </div>{" "}
      <div className="border-l bg-primary/10 w-full h-[90vh] flex items-center justify-between rounded-tr rounded-br overflow-y-auto p-2">
        {messages?.data.length === 0 ? (
          <EmptyDemo />
        ) : (
          <MessageList refetch={refetch} messages={messages?.data || []} />
        )}
      </div>
    </>
  );
}

export default page;

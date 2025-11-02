import { ArrowUpRightIcon, MessageCircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

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
  return (
    <div className="border-l bg-primary/10 w-full h-[90vh] flex items-center justify-between rounded-tr rounded-br overflow-y-auto p-2">
      <EmptyDemo />
    </div>
  );
}

export default page;

import React from "react";
import MessageCard from "./MessageCard";

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
  return (
    <div className="bg-primary/5 w-full md:w-96 h-[90vh] rounded-tl pt-5 rounded-bl overflow-y-auto">
      {messages.map((message) => (
        <MessageCard key={message.id} {...message} />
      ))}
    </div>
  );
}

export default MessageSideBar;

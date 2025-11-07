import { Inbox, MessageInbox, SendMessageInput } from "@/types";
import axios from "axios";

export async function sendMessage(data: SendMessageInput) {
  const response = await axios.post("/api/message", data);
  return response.data;
}

export async function getInboxesByUserId(id: string) {
  const response = await axios.get(`/api/message/${id}`);

  return response.data as { data: Inbox[] };
}

function formatAndRemovedDuplicates(messages: MessageInbox[]) {
  const uniqueConversations: { [key: string]: MessageInbox } = {};

  messages.forEach((message) => {
    const otherUserId =
      message.sender.id === message.receiver.id
        ? message.sender.id
        : message.sender.id;

    if (
      !uniqueConversations[otherUserId] ||
      new Date(message.createdAt) >
        new Date(uniqueConversations[otherUserId].createdAt)
    ) {
      uniqueConversations[otherUserId] = message;
    }
  });

  return Object.values(uniqueConversations);
}

export async function getMessagesBetweenUsers(
  userId1: string,
  userId2: string
) {
  const response = await axios.get(
    `/api/message/convo?user1=${userId1}&user2=${userId2}`
  );

  console.log(response.data, "here..");

  return response.data as { data: MessageInbox[] };
}

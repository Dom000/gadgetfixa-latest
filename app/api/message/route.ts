import prisma from "@/lib/prisma/prisma";
import { SendMessageInput } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { senderId, receiverId, content }: SendMessageInput =
    await request.json();
  console.log(senderId, receiverId, content);

  let inbox = await prisma.inbox.findFirst({
    where: {
      OR: [
        { participant1: senderId, participant2: receiverId },
        { participant1: receiverId, participant2: senderId },
      ],
    },
  });


  if (!inbox) {
    inbox = await prisma.inbox.create({
      data: {
        participant1: senderId,
        participant2: receiverId,
      },
    });
  }

  const data = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
      inboxId: inbox.id,
    },
  });

  if (!data) {
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Message sent successfully", data },
    { status: 201 }
  );
}

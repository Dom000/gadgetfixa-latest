import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

  if (!user1 || !user2) {
    return NextResponse.json({ message: "Missing user IDs" }, { status: 400 });
  }

  const data = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    },
    include: {
      sender: {
        select: {
          fullName: true,
          id: true,
        },
      },
      receiver: {
        select: {
          fullName: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data) {
    return NextResponse.json({
      message: "Messages not found",
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Messages fetched successfully",
    data,
    status: 200,
  });
}

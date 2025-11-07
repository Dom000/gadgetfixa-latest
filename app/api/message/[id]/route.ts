import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await prisma.inbox.findMany({
    where: {
      OR: [
        {
          participant1: id,
        },
        {
          participant2: id,
        },
      ],
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      user1: {
        select: {
          fullName: true,
          id: true,
        },
      },
      user2: {
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

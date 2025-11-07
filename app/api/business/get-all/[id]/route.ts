import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await prisma.bussiness.findMany({
    where: {
      profileId: id,
    },
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
      categories: true,
      portfolios: true,
    },
  });

  if (!data) {
    return NextResponse.json({
      message: "Business not found",
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Business fetched successfully",
    data,
    status: 200,
  });
}

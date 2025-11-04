import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  const data = await prisma.bussiness.findFirst({
    where: {
      id,
    },
    include: {
      reviews: true,
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

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  const data = await prisma.bussiness.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({
    message: "Business updated successfully",
    data,
    status: 200,
  });
}



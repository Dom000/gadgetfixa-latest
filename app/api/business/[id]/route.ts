import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = params;

  const data = await prisma.bussiness.findUnique({
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

import prisma from "@/lib/prisma/prisma";
import { ReviewInput } from "@/types";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { profileId, anonymous, anonymousName, bussinessId, rating, comment } =
    (await request.json()) as ReviewInput;

  const businessExists = await prisma.bussiness.findUnique({
    where: { id: bussinessId },
  });

  if (!businessExists) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    );
  }

  const review = await prisma.review.create({
    data: {
      profileId,
      anonymous,
      anonymousName,
      bussinessId,
      rating,
      comment,
    },
  });

  return NextResponse.json(
    { message: "Review created successfully", data: review },
    { status: 201 }
  );
}

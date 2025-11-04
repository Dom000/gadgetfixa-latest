import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      accounts: {
        omit: { password: true },
      },
    },
    omit: {
      password: true,
    },
  });

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }


  return NextResponse.json(
    {
      message: "Profile fetched successfully",
      data: profile,
    },
    { status: 200 }
  );
}

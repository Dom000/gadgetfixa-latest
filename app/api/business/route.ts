import prisma from "@/lib/prisma/prisma";
import { BusinessType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    address,
    name,
    categories,
    description,
    email,
    occupation,
    phone,
    profileId,
    website,
  } = (await request.json()) as BusinessType;

  const data = await prisma.bussiness.create({
    data: {
      address,
      profileId,
      description,
      email,
      name,
      occupation,
      phone,
      website,
      categories: {
        createMany: {
          data: categories?.map((category) => ({
            name: typeof category === 'string' ? category : category.name,
          })),
        },
      },
    },
  });

  if (!data) {
    return NextResponse.json(
      { message: "Failed to create business" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Business created successfully", data },
    { status: 201 }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.bussiness.findMany({
      skip,
      take: limit,
      include: {
        categories: true,
        reviews: true,
      },
    }),
    prisma.bussiness.count(),
  ]);

  return NextResponse.json(
    {
      message: "Businesses fetched successfully",
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
    { status: 200 }
  );
}

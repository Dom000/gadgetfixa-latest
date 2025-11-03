import prisma from "@/lib/prisma/prisma";
import { Business } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    address,
    bussinessName,
    categories,
    description,
    email,
    occupation,
    phone,
    website,
  } = (await request.json()) as Business;

  const data = await prisma.bussiness.create({
    data: {
      address,
      description,
      email,
      name: bussinessName,
      occupation,
      phone,
      website,
      categories: {
        createMany: {
          data: categories.map((i) => ({
            name: i,
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

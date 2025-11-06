import prisma from "@/lib/prisma/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const formData = await request.formData();
  console.log(formData, "fordata server");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;

  // Handle image upload here if needed
  const imageUrl = imageFile ? await uploadFile(imageFile) : "";

  const data = await prisma.portfolio.create({
    data: {
      bussinessId: id,
      title,
      description,
      imageUrl,
    },
  });

  if (!data) {
    return NextResponse.json(
      { message: "Failed to add portfolio item" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Portfolio item added successfully", data },
    { status: 201 }
  );
}

async function uploadFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "gadget-fixa/portfolio",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(new Error("File upload failed"));
          } else {
            resolve(result?.secure_url || "");
          }
        }
      )
      .end(buffer);
  });
}

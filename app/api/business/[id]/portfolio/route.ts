import prisma from "@/lib/prisma/prisma";
import { supabase } from "@/supabase/client";
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

async function uploadFile(file: File) {
  const { data, error } = await supabase.storage
    .from("gadget-fixa")
    .upload(`portfolio/${file.name}`, file);
  if (error) {
    console.log(error,'error...');

    throw new Error("File upload failed");
  } else {
    console.log(data, "from supabase");

    return data.fullPath;
  }
}

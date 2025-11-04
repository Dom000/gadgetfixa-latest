export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  return new Response(
    JSON.stringify({ message: `Add portfolio item for business ID: ${id}` }),
    { status: 200 }
  );
}

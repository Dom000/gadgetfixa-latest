export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request) {
  return new Response(
    JSON.stringify({ message: `Add portfolio item for business ID: ` }),
    { status: 200 }
  );
}

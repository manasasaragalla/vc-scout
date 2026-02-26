import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const website = body.website;

  return NextResponse.json({
    summary: `${website} is a fast-growing startup providing innovative digital solutions.`,
  });
}
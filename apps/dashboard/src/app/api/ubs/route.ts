import { NextResponse } from "next/server";
import { getUbsList } from "@/lib/data";

export async function GET() {
  const ubs = await getUbsList();
  return NextResponse.json(ubs);
}

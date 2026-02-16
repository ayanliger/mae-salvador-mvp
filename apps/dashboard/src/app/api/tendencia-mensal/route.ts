import { NextResponse } from "next/server";
import { getTendenciaMensal } from "@/lib/data";

export async function GET() {
  const tendencia = await getTendenciaMensal();
  return NextResponse.json(tendencia);
}

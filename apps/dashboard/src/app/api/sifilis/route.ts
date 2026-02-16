import { NextResponse } from "next/server";
import { getCasosSifilis } from "@/lib/data";

export async function GET() {
  const casos = await getCasosSifilis();
  return NextResponse.json(casos);
}

import { NextResponse } from "next/server";
import { getIndicadoresPrevine } from "@/lib/data";

export async function GET() {
  const indicadores = await getIndicadoresPrevine();
  return NextResponse.json(indicadores);
}

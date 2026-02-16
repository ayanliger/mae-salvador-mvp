import { NextResponse } from "next/server";
import { getProfissionais } from "@/lib/data";

export async function GET() {
  const profissionais = await getProfissionais();
  return NextResponse.json(profissionais);
}

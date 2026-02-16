import { NextResponse } from "next/server";
import { getDadosUbs } from "@/lib/data";

export async function GET() {
  const dados = await getDadosUbs();
  return NextResponse.json(dados);
}

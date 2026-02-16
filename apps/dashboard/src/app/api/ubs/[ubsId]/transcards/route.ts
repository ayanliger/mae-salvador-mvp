import { NextResponse } from "next/server";
import { appGetTranscardsDisponiveis } from "@/lib/app-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ubsId: string }> },
) {
  const { ubsId } = await params;
  const numeros = await appGetTranscardsDisponiveis(ubsId);
  return NextResponse.json(numeros);
}

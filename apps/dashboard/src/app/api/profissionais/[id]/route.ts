import { NextResponse } from "next/server";
import { getProfissionalById } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const profissional = await getProfissionalById(id);

  if (!profissional) {
    return NextResponse.json(
      { error: "Profissional não encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(profissional);
}

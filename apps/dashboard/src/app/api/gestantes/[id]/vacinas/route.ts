import { NextResponse } from "next/server";
import { getGestanteById, getVacinasByGestante } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const gestante = await getGestanteById(id);

  if (!gestante) {
    return NextResponse.json(
      { error: "Gestante não encontrada" },
      { status: 404 },
    );
  }

  const vacinas = await getVacinasByGestante(id);
  return NextResponse.json(vacinas);
}

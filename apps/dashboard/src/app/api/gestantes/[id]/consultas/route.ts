import { NextResponse } from "next/server";
import { esusGetGestanteById, esusGetConsultasByGestante } from "@/lib/esus-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const gestante = await esusGetGestanteById(id);

    if (!gestante) {
      return NextResponse.json(
        { error: "Gestante não encontrada" },
        { status: 404 },
      );
    }

    const consultas = await esusGetConsultasByGestante(id, gestante.dum);
    return NextResponse.json(consultas);
  } catch (e: unknown) {
    console.error(`[api/gestante/${id}/consultas] DB error:`, e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

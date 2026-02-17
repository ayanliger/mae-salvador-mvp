import { NextResponse } from "next/server";
import { esusGetGestanteById, esusGetMedicacoesByGestante } from "@/lib/esus-data";

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

    const medicacoes = await esusGetMedicacoesByGestante(id);
    return NextResponse.json(medicacoes);
  } catch (e: unknown) {
    console.error(`[api/gestante/${id}/medicacoes] DB error:`, e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

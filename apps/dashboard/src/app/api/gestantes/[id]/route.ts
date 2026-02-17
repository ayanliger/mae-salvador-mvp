import { NextResponse } from "next/server";
import {
  esusGetGestanteById,
  esusGetConsultasByGestante,
  esusGetExamesByGestante,
  esusGetVacinasByGestante,
  esusGetMedicacoesByGestante,
  esusGetFatoresRisco,
} from "@/lib/esus-data";

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

    const [consultas, exames, vacinas, medicacoes, fatoresRisco] =
      await Promise.all([
        esusGetConsultasByGestante(id, gestante.dum),
        esusGetExamesByGestante(id, gestante.dum),
        esusGetVacinasByGestante(id),
        esusGetMedicacoesByGestante(id),
        esusGetFatoresRisco(id),
      ]);

    return NextResponse.json({
      ...gestante,
      fatoresRisco,
      consultas,
      exames,
      vacinas,
      medicacoes,
      transcard: null,
      atividades: [],
      visitas: [],
    });
  } catch (e: unknown) {
    console.error(`[api/gestante/${id}] DB error:`, e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

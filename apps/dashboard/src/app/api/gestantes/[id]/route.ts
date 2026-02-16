import { NextResponse } from "next/server";
import {
  getGestanteById,
  getConsultasByGestante,
  getExamesByGestante,
  getVacinasByGestante,
  getMedicacoesByGestante,
  getTranscardByGestante,
  getAtividadesByGestante,
  getVisitasByGestante,
} from "@/lib/data";

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

  const [consultas, exames, vacinas, medicacoes, transcard, atividades, visitas] =
    await Promise.all([
      getConsultasByGestante(id),
      getExamesByGestante(id),
      getVacinasByGestante(id),
      getMedicacoesByGestante(id),
      getTranscardByGestante(id),
      getAtividadesByGestante(id),
      getVisitasByGestante(id),
    ]);

  return NextResponse.json({
    ...gestante,
    consultas,
    exames,
    vacinas,
    medicacoes,
    transcard,
    atividades,
    visitas,
  });
}

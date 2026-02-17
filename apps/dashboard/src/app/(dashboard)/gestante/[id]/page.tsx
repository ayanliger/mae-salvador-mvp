import { notFound } from "next/navigation";
import {
  esusGetGestanteById,
  esusGetConsultasByGestante,
  esusGetExamesByGestante,
  esusGetVacinasByGestante,
  esusGetMedicacoesByGestante,
  esusGetFatoresRisco,
  esusGetUbsList,
} from "@/lib/esus-data";
import { appGetTranscardByGestante } from "@/lib/app-data";
import GestanteDetailClient from "./gestante-detail-client";

export default async function GestanteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gestante = await esusGetGestanteById(id);

  if (!gestante) return notFound();

  const [consultas, exames, vacinas, medicacoes, fatoresRisco, ubsList, transcard] = await Promise.all([
    esusGetConsultasByGestante(id, gestante.dum),
    esusGetExamesByGestante(id, gestante.dum),
    esusGetVacinasByGestante(id),
    esusGetMedicacoesByGestante(id),
    esusGetFatoresRisco(id),
    esusGetUbsList(),
    appGetTranscardByGestante(id).catch(() => null),
  ]);

  return (
    <GestanteDetailClient
      gestante={gestante}
      consultas={consultas}
      exames={exames}
      vacinas={vacinas}
      medicacoes={medicacoes}
      ubsList={ubsList}
      fatoresRisco={fatoresRisco}
      transcard={transcard}
    />
  );
}

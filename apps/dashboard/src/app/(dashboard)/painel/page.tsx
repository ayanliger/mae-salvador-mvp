import { esusGetGestantes, esusGetUbsList, esusGetUltimaConsultaPorGestante } from "@/lib/esus-data";
import PainelClient from "./painel-client";

export default async function PainelPage() {
  const [allGestantes, ubsList, ultimaConsultaMap] = await Promise.all([
    esusGetGestantes(),
    esusGetUbsList(),
    esusGetUltimaConsultaPorGestante(),
  ]);
  const gestantes = allGestantes.filter((g) => g.ativa);

  return (
    <PainelClient
      gestantes={gestantes}
      ubsList={ubsList}
      ultimaConsultaMap={ultimaConsultaMap}
    />
  );
}

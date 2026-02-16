import { esusGetGestantes, esusGetUbsList, esusGetUltimaConsultaPorGestante } from "@/lib/esus-data";
import PainelClient from "./painel-client";

export default async function PainelPage() {
  const [gestantes, ubsList, ultimaConsultaMap] = await Promise.all([
    esusGetGestantes(),
    esusGetUbsList(),
    esusGetUltimaConsultaPorGestante(),
  ]);

  return (
    <PainelClient
      gestantes={gestantes}
      ubsList={ubsList}
      ultimaConsultaMap={ultimaConsultaMap}
    />
  );
}

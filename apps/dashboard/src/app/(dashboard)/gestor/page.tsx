import {
  esusGetGestantes,
  esusGetUbsList,
  esusGetCasosSifilis,
  esusGetIndicadoresSnapshot,
  esusGetUltimaConsultaPorGestante,
} from "@/lib/esus-data";
import GestorClient from "./gestor-client";

export default async function GestorPage() {
  const [gestantes, ubsList, casosSifilis, indicadoresSnapshot, ultimaConsultaMap] = await Promise.all([
    esusGetGestantes(),
    esusGetUbsList(),
    esusGetCasosSifilis(),
    esusGetIndicadoresSnapshot(),
    esusGetUltimaConsultaPorGestante(),
  ]);

  return (
    <GestorClient
      gestantes={gestantes}
      ubsList={ubsList}
      casosSifilis={casosSifilis}
      indicadoresSnapshot={indicadoresSnapshot}
      ultimaConsultaMap={ultimaConsultaMap}
    />
  );
}

import { Suspense } from "react";
import { esusGetGestantes } from "@/lib/esus-data";
import RegistrarClient from "./registrar-client";

export default async function RegistrarConsultaPage() {
  const gestantes = await esusGetGestantes();

  return (
    <Suspense>
      <RegistrarClient gestantes={gestantes} />
    </Suspense>
  );
}

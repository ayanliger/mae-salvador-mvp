import { NextRequest, NextResponse } from "next/server";
import { esusGetGestantes, esusGetUltimaConsultaPorGestante } from "@/lib/esus-data";
import type { RiscoGestacional, Gestante } from "@mae-salvador/shared";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    let gestantes: Gestante[] = await esusGetGestantes();

    // Default to active-only unless explicitly requesting inactive
    const ativa = searchParams.has("ativa")
      ? searchParams.get("ativa") === "true"
      : true;
    gestantes = gestantes.filter((g) => g.ativa === ativa);
    const risco = searchParams.get("risco") as RiscoGestacional | null;
    if (risco) {
      gestantes = gestantes.filter((g) => g.riscoGestacional === risco);
    }
    const ubsId = searchParams.get("ubsId");
    if (ubsId) {
      gestantes = gestantes.filter((g) => g.ubsId === ubsId);
    }
    const equipeId = searchParams.get("equipeId");
    if (equipeId) {
      gestantes = gestantes.filter((g) => g.equipeId === equipeId);
    }
    const search = searchParams.get("search");
    if (search) {
      const q = search.toLowerCase();
      gestantes = gestantes.filter(
        (g) =>
          g.nomeCompleto.toLowerCase().includes(q) || g.cpf.includes(q),
      );
    }

    return NextResponse.json(gestantes);
  } catch (e: unknown) {
    console.error("[api/gestantes] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

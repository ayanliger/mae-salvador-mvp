import { NextResponse } from "next/server";
import { esusGetIndicadoresSnapshot } from "@/lib/esus-data";
import type { KPIsGestor } from "@mae-salvador/shared";

export async function GET() {
  try {
    const snap = await esusGetIndicadoresSnapshot();
    const total = snap.totalGestantes || 1; // avoid division by zero

    const kpis: KPIsGestor = {
      gestantesAtivas: snap.totalGestantes,
      consultasRealizadasMes: snap.gestantesComConsulta,
      inicioPrecoce: Math.round((snap.inicioPrecoce / total) * 100),
      seteMaisConsultas: Math.round((snap.com7Consultas / total) * 100),
      coberturaVacinalDtpa: Math.round((snap.coberturaDtpa / total) * 100),
      coberturaVacinalInfluenza: Math.round((snap.coberturaInfluenza / total) * 100),
      examesPrimeiroTrimestre: 0, // not available from current snapshot
      distribuicaoRisco: {
        habitual: snap.totalGestantes,
        alto: 0,
      },
    };

    return NextResponse.json(kpis);
  } catch (e: unknown) {
    console.error("[api/kpis] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

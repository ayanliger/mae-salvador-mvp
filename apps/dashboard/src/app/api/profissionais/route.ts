import { NextResponse } from "next/server";
import { getEsusPool } from "@/lib/db";

export async function GET() {
  try {
    // Return a limited set of profissionais from the e-SUS view
    const { rows } = await getEsusPool().query(
      `SELECT co_seq_prof, no_profissional, nu_cbo, no_cbo
       FROM mae_salvador.vw_profissional
       WHERE no_profissional IS NOT NULL
       ORDER BY no_profissional
       LIMIT 200`
    );
    const profissionais = rows.map((r: Record<string, unknown>) => ({
      id: String(r.co_seq_prof),
      nomeCompleto: String(r.no_profissional ?? ""),
      cbo: String(r.nu_cbo ?? ""),
      cargo: String(r.no_cbo ?? ""),
    }));
    return NextResponse.json(profissionais);
  } catch (e: unknown) {
    console.error("[api/profissionais] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

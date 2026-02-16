import { NextResponse } from "next/server";
import { getEsusPool, getAppPool } from "@/lib/db";

export async function GET() {
  const status: Record<string, unknown> = { timestamp: new Date().toISOString() };

  // e-SUS (read-only)
  try {
    const { rows } = await getEsusPool().query("SELECT current_database() AS db, current_user AS usr");
    status.esus = { ok: true, ...rows[0] };
  } catch (e: unknown) {
    status.esus = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // Mãe Salvador app DB (read-write)
  try {
    const { rows } = await getAppPool().query("SELECT current_database() AS db, current_user AS usr");
    status.app = { ok: true, ...rows[0] };
  } catch (e: unknown) {
    status.app = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  const allOk = (status.esus as { ok: boolean }).ok && (status.app as { ok: boolean }).ok;
  return NextResponse.json(status, { status: allOk ? 200 : 503 });
}

import { NextResponse } from "next/server";
import { getEsusPool } from "@/lib/db";

export async function GET() {
  const status: Record<string, unknown> = { timestamp: new Date().toISOString() };

  // e-SUS (read-only)
  try {
    const { rows } = await getEsusPool().query("SELECT current_database() AS db, current_user AS usr");
    status.esus = { ok: true, ...rows[0] };
  } catch (e: unknown) {
    status.esus = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // Mãe Salvador app DB (not available on this network)
  if (process.env.APP_DATABASE_URL) {
    const { getAppPool } = await import("@/lib/db");
    try {
      const { rows } = await getAppPool().query("SELECT current_database() AS db, current_user AS usr");
      status.app = { ok: true, ...rows[0] };
    } catch (e: unknown) {
      status.app = { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  } else {
    status.app = { ok: false, error: "APP_DATABASE_URL not configured" };
  }

  const esusOk = (status.esus as { ok: boolean }).ok;
  return NextResponse.json(status, { status: esusOk ? 200 : 503 });
}

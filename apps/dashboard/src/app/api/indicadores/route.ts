import { NextResponse } from "next/server";
import { esusGetIndicadoresSnapshot } from "@/lib/esus-data";

export async function GET() {
  try {
    const snapshot = await esusGetIndicadoresSnapshot();
    return NextResponse.json(snapshot);
  } catch (e: unknown) {
    console.error("[api/indicadores] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

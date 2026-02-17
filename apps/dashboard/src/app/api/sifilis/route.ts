import { NextResponse } from "next/server";
import { esusGetCasosSifilis } from "@/lib/esus-data";

export async function GET() {
  try {
    const casos = await esusGetCasosSifilis();
    return NextResponse.json(casos);
  } catch (e: unknown) {
    console.error("[api/sifilis] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

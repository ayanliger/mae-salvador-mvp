import { NextResponse } from "next/server";
import { esusGetUbsList } from "@/lib/esus-data";

export async function GET() {
  try {
    const ubs = await esusGetUbsList();
    return NextResponse.json(ubs);
  } catch (e: unknown) {
    console.error("[api/ubs] DB error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}

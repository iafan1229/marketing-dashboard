// src/app/api/data/signups_by_region/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      labels: ["North America", "Europe", "Asia"],
      values: [120, 95, 180],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch signups by region data" },
      { status: 500 }
    );
  }
}

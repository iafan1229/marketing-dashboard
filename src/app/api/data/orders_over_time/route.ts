// src/app/api/data/orders_over_time/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      labels: ["2025-07-01", "2025-07-02", "2025-07-03"],
      values: [32, 45, 41],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders over time data" },
      { status: 500 }
    );
  }
}

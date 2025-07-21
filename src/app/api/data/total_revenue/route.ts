// src/app/api/data/total_revenue/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      value: 98123,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch total revenue data" },
      { status: 500 }
    );
  }
}

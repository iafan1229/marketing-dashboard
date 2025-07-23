import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET() {
  try {
    const dashboards = mockDb.dashboards.getAll();
    return NextResponse.json(dashboards);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Dashboard name is required" },
        { status: 400 }
      );
    }

    const dashboard = mockDb.dashboards.create({
      name: body.name.trim(),
      charts: body.charts || [],
    });

    return NextResponse.json(dashboard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create dashboard" },
      { status: 500 }
    );
  }
}

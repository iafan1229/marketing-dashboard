// src/app/api/dashboards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllDashboards, createDashboard } from "@/lib/mockData";

export async function GET() {
  try {
    const dashboards = getAllDashboards();
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

    // Validate required fields
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Dashboard name is required and must be a string" },
        { status: 400 }
      );
    }

    const dashboardData = {
      name: body.name.trim(),
      charts: body.charts || [],
    };

    const newDashboard = createDashboard(dashboardData);

    return NextResponse.json(newDashboard, { status: 201 });
  } catch (error) {
    console.error("Error creating dashboard:", error);
    return NextResponse.json(
      { error: "Failed to create dashboard" },
      { status: 500 }
    );
  }
}

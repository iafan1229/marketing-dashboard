import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET() {
  try {
    const charts = mockDb.charts.getAll();
    return NextResponse.json(charts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch charts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.dashboardId || !body.type || !body.title) {
      return NextResponse.json(
        { error: "Dashboard ID, type, and title are required" },
        { status: 400 }
      );
    }

    if (!["bar", "line", "number"].includes(body.type)) {
      return NextResponse.json(
        { error: "Invalid chart type" },
        { status: 400 }
      );
    }

    // Check if dashboard exists
    const dashboard = mockDb.dashboards.getById(body.dashboardId);
    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    const chartData = {
      dashboardId: body.dashboardId,
      type: body.type,
      title: body.title.trim(),
      dataEndpoint:
        body.dataEndpoint ||
        `/api/data/${body.title.toLowerCase().replace(/\s+/g, "_")}`,
      order:
        body.order !== undefined
          ? body.order
          : mockDb.charts.getNextOrder(body.dashboardId),
    };

    const newChart = mockDb.charts.create(chartData);
    return NextResponse.json(newChart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create chart" },
      { status: 500 }
    );
  }
}

// src/app/api/charts/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getAllCharts,
  createChart,
  getDashboardById,
  getNextChartOrder,
} from "@/lib/mockData";

export async function GET() {
  try {
    const charts = getAllCharts();
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

    // Validate required fields
    if (!body.dashboardId || typeof body.dashboardId !== "string") {
      return NextResponse.json(
        { error: "Dashboard ID is required and must be a string" },
        { status: 400 }
      );
    }

    if (!body.type || !["bar", "line", "number"].includes(body.type)) {
      return NextResponse.json(
        {
          error: "Chart type is required and must be one of: bar, line, number",
        },
        { status: 400 }
      );
    }

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Chart title is required and must be a string" },
        { status: 400 }
      );
    }

    // Check if dashboard exists
    const dashboard = getDashboardById(body.dashboardId);
    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    // Generate data endpoint based on type and title if not provided
    let dataEndpoint = body.dataEndpoint;
    if (!dataEndpoint) {
      // Auto-generate based on chart type and title
      const titleSlug = body.title.toLowerCase().replace(/\s+/g, "_");
      dataEndpoint = `/api/data/${titleSlug}`;
    }

    const chartData = {
      dashboardId: body.dashboardId,
      type: body.type,
      title: body.title.trim(),
      dataEndpoint,
      order:
        body.order !== undefined
          ? body.order
          : getNextChartOrder(body.dashboardId),
    };

    const newChart = createChart(chartData);

    return NextResponse.json(newChart, { status: 201 });
  } catch (error) {
    console.error("Error creating chart:", error);
    return NextResponse.json(
      { error: "Failed to create chart" },
      { status: 500 }
    );
  }
}

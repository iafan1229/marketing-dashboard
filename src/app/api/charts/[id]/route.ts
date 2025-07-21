// src/app/api/charts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getChartById, updateChart, deleteChart } from "@/lib/mockData";
import { Chart } from "@/types/api";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const chart = getChartById(params.id);

    if (!chart) {
      return NextResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    return NextResponse.json(chart);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();

    // Check if chart exists
    const existingChart = getChartById(params.id);
    if (!existingChart) {
      return NextResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    // Validate fields if provided
    if (
      body.type !== undefined &&
      !["bar", "line", "number"].includes(body.type)
    ) {
      return NextResponse.json(
        { error: "Chart type must be one of: bar, line, number" },
        { status: 400 }
      );
    }

    if (
      body.title !== undefined &&
      (typeof body.title !== "string" || body.title.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Chart title must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      body.order !== undefined &&
      (typeof body.order !== "number" || body.order < 0)
    ) {
      return NextResponse.json(
        { error: "Chart order must be a non-negative number" },
        { status: 400 }
      );
    }

    if (
      body.dataEndpoint !== undefined &&
      typeof body.dataEndpoint !== "string"
    ) {
      return NextResponse.json(
        { error: "Data endpoint must be a string" },
        { status: 400 }
      );
    }

    const updates: Partial<Chart> = {};
    if (body.type !== undefined) updates.type = body.type;
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.order !== undefined) updates.order = body.order;
    if (body.dataEndpoint !== undefined)
      updates.dataEndpoint = body.dataEndpoint;

    const updatedChart = updateChart(params.id, updates);

    if (!updatedChart) {
      return NextResponse.json(
        { error: "Failed to update chart" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedChart);
  } catch (error) {
    console.error("Error updating chart:", error);
    return NextResponse.json(
      { error: "Failed to update chart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = deleteChart(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Chart deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chart:", error);
    return NextResponse.json(
      { error: "Failed to delete chart" },
      { status: 500 }
    );
  }
}

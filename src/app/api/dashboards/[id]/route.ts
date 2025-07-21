// src/app/api/dashboards/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getDashboardById,
  updateDashboard,
  deleteDashboard,
} from "@/lib/mockData";
import { Dashboard } from "@/types/api";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const dashboard = getDashboardById(params.id);

    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(dashboard);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();

    // Check if dashboard exists
    const existingDashboard = getDashboardById(params.id);
    if (!existingDashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    // Validate name if provided
    if (
      body.name !== undefined &&
      (typeof body.name !== "string" || body.name.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Dashboard name must be a non-empty string" },
        { status: 400 }
      );
    }

    // Validate charts if provided
    if (body.charts !== undefined && !Array.isArray(body.charts)) {
      return NextResponse.json(
        { error: "Charts must be an array" },
        { status: 400 }
      );
    }

    const updates: Partial<Dashboard> = {};
    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.charts !== undefined) updates.charts = body.charts;

    const updatedDashboard = updateDashboard(params.id, updates);

    if (!updatedDashboard) {
      return NextResponse.json(
        { error: "Failed to update dashboard" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedDashboard);
  } catch (error) {
    console.error("Error updating dashboard:", error);
    return NextResponse.json(
      { error: "Failed to update dashboard" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = deleteDashboard(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Dashboard deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting dashboard:", error);
    return NextResponse.json(
      { error: "Failed to delete dashboard" },
      { status: 500 }
    );
  }
}

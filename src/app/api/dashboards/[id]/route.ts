import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dashboard = mockDb.dashboards.getById(params.id);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = mockDb.dashboards.delete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Dashboard deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete dashboard" },
      { status: 500 }
    );
  }
}

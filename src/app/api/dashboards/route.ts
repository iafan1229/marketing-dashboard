// src/app/api/dashboards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

    // Validate required fields for dashboard creation
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Dashboard name is required and must be a string" },
        { status: 400 }
      );
    }

    // Create new dashboard
    const dashboard = createDashboard({
      name: body.name.trim(),
      charts: [], // 빈 배열로 시작
      // description: body.description || "", // 설명이 있다면 추가
      // user 정보도 필요하다면 추가
    });

    return NextResponse.json(dashboard, { status: 201 });
  } catch (error) {
    console.error("Error creating dashboard:", error);
    return NextResponse.json(
      { error: "Failed to create dashboard" },
      { status: 500 }
    );
  }
}

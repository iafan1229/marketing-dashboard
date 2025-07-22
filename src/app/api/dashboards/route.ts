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
    const { title, description, user } = body;

    // 클라이언트에서 보낸 user 정보를 그대로 사용 (간단한 방식)
    const newDashboard = {
      id: Date.now().toString(),
      title,
      description: description || "",
      userId: user.id,
      user: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      charts: [],
    };

    // 실제 환경에서는 데이터베이스에 저장
    return NextResponse.json(newDashboard, { status: 201 });
  } catch (error) {
    console.error("Dashboard creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

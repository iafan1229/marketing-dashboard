// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { mockDb } from "@/lib/mockDb";

const VALID_CHART_TYPES = [
  "bar",
  "line",
  "number",
  "pie",
  "area",
  "donut",
  "radar",
  "scatter",
  "metric",
];

export const handlers = [
  // ========================================
  // Dashboard Endpoints
  // ========================================

  // GET /api/dashboards - 모든 대시보드 조회
  http.get("/api/dashboards", () => {
    const dashboards = mockDb.dashboards.getAll();
    return HttpResponse.json(dashboards);
  }),

  // GET /api/dashboards/:id - 특정 대시보드 조회
  http.get("/api/dashboards/:id", ({ params }) => {
    const { id } = params;
    const dashboard = mockDb.dashboards.getById(id as string);

    if (!dashboard) {
      return HttpResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(dashboard);
  }),

  // POST /api/dashboards - 새 대시보드 생성
  http.post("/api/dashboards", async ({ request }) => {
    const body = (await request.json()) as any;

    // Validation
    if (!body.name || typeof body.name !== "string") {
      return HttpResponse.json(
        { error: "Dashboard name is required and must be a string" },
        { status: 400 }
      );
    }

    if (body.name.trim().length === 0) {
      return HttpResponse.json(
        { error: "Dashboard name cannot be empty" },
        { status: 400 }
      );
    }

    if (body.charts !== undefined && !Array.isArray(body.charts)) {
      return HttpResponse.json(
        { error: "Charts must be an array" },
        { status: 400 }
      );
    }

    const dashboard = mockDb.dashboards.create({
      name: body.name.trim(),
      charts: body.charts || [],
    });

    return HttpResponse.json(dashboard, { status: 201 });
  }),

  // PUT /api/dashboards/:id - 대시보드 업데이트
  http.put("/api/dashboards/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as any;

    const existingDashboard = mockDb.dashboards.getById(id as string);
    if (!existingDashboard) {
      return HttpResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    // Validation
    if (
      body.name !== undefined &&
      (typeof body.name !== "string" || body.name.trim() === "")
    ) {
      return HttpResponse.json(
        { error: "Dashboard name must be a non-empty string" },
        { status: 400 }
      );
    }

    if (body.charts !== undefined && !Array.isArray(body.charts)) {
      return HttpResponse.json(
        { error: "Charts must be an array" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.charts !== undefined) updates.charts = body.charts;

    const updatedDashboard = mockDb.dashboards.update(id as string, updates);

    if (!updatedDashboard) {
      return HttpResponse.json(
        { error: "Failed to update dashboard" },
        { status: 500 }
      );
    }

    return HttpResponse.json(updatedDashboard);
  }),

  // DELETE /api/dashboards/:id - 대시보드 삭제
  http.delete("/api/dashboards/:id", ({ params }) => {
    const { id } = params;
    const deleted = mockDb.dashboards.delete(id as string);

    if (!deleted) {
      return HttpResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: "Dashboard deleted successfully" },
      { status: 200 }
    );
  }),

  // ========================================
  // Chart Endpoints
  // ========================================

  // GET /api/charts - 모든 차트 조회
  http.get("/api/charts", () => {
    const charts = mockDb.charts.getAll();
    return HttpResponse.json(charts);
  }),

  // GET /api/charts/:id - 특정 차트 조회
  http.get("/api/charts/:id", ({ params }) => {
    const { id } = params;
    const chart = mockDb.charts.getById(id as string);

    if (!chart) {
      return HttpResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    return HttpResponse.json(chart);
  }),

  // POST /api/charts - 새 차트 생성
  http.post("/api/charts", async ({ request }) => {
    const body = (await request.json()) as any;

    // Required field validation
    if (!body.dashboardId || typeof body.dashboardId !== "string") {
      return HttpResponse.json(
        { error: "Dashboard ID is required and must be a string" },
        { status: 400 }
      );
    }

    if (!body.type || !VALID_CHART_TYPES.includes(body.type)) {
      return HttpResponse.json(
        {
          error: `Chart type is required and must be one of: ${VALID_CHART_TYPES.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    if (!body.title || typeof body.title !== "string") {
      return HttpResponse.json(
        { error: "Chart title is required and must be a string" },
        { status: 400 }
      );
    }

    if (body.title.trim().length === 0) {
      return HttpResponse.json(
        { error: "Chart title cannot be empty" },
        { status: 400 }
      );
    }

    // Check if dashboard exists
    const dashboard = mockDb.dashboards.getById(body.dashboardId);
    if (!dashboard) {
      return HttpResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    // Optional field validation
    if (
      body.dataEndpoint !== undefined &&
      typeof body.dataEndpoint !== "string"
    ) {
      return HttpResponse.json(
        { error: "Data endpoint must be a string" },
        { status: 400 }
      );
    }

    if (
      body.order !== undefined &&
      (typeof body.order !== "number" || body.order < 0)
    ) {
      return HttpResponse.json(
        { error: "Order must be a non-negative number" },
        { status: 400 }
      );
    }

    // Generate data endpoint if not provided
    let dataEndpoint = body.dataEndpoint;
    if (!dataEndpoint) {
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
          : mockDb.charts.getNextOrder(body.dashboardId),
    };

    const newChart = mockDb.charts.create(chartData);
    return HttpResponse.json(newChart, { status: 201 });
  }),

  // PUT /api/charts/:id - 차트 업데이트
  http.put("/api/charts/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as any;

    const existingChart = mockDb.charts.getById(id as string);
    if (!existingChart) {
      return HttpResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    // Validation for optional updates
    if (body.type !== undefined && !VALID_CHART_TYPES.includes(body.type)) {
      return HttpResponse.json(
        { error: `Chart type must be one of: ${VALID_CHART_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    if (
      body.title !== undefined &&
      (typeof body.title !== "string" || body.title.trim() === "")
    ) {
      return HttpResponse.json(
        { error: "Chart title must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      body.order !== undefined &&
      (typeof body.order !== "number" || body.order < 0)
    ) {
      return HttpResponse.json(
        { error: "Chart order must be a non-negative number" },
        { status: 400 }
      );
    }

    if (
      body.dataEndpoint !== undefined &&
      typeof body.dataEndpoint !== "string"
    ) {
      return HttpResponse.json(
        { error: "Data endpoint must be a string" },
        { status: 400 }
      );
    }

    if (
      body.dashboardId !== undefined &&
      typeof body.dashboardId !== "string"
    ) {
      return HttpResponse.json(
        { error: "Dashboard ID must be a string" },
        { status: 400 }
      );
    }

    // Check if new dashboard exists (if dashboardId is being updated)
    if (body.dashboardId !== undefined) {
      const dashboard = mockDb.dashboards.getById(body.dashboardId);
      if (!dashboard) {
        return HttpResponse.json(
          { error: "Dashboard not found" },
          { status: 404 }
        );
      }
    }

    const updates: any = {};
    if (body.type !== undefined) updates.type = body.type;
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.order !== undefined) updates.order = body.order;
    if (body.dataEndpoint !== undefined)
      updates.dataEndpoint = body.dataEndpoint;
    if (body.dashboardId !== undefined) updates.dashboardId = body.dashboardId;

    const updatedChart = mockDb.charts.update(id as string, updates);

    if (!updatedChart) {
      return HttpResponse.json(
        { error: "Failed to update chart" },
        { status: 500 }
      );
    }

    return HttpResponse.json(updatedChart);
  }),

  // DELETE /api/charts/:id - 차트 삭제
  http.delete("/api/charts/:id", ({ params }) => {
    const { id } = params;
    const deleted = mockDb.charts.delete(id as string);

    if (!deleted) {
      return HttpResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    return HttpResponse.json(
      { message: "Chart deleted successfully" },
      { status: 200 }
    );
  }),

  // ========================================
  // Data Endpoints (Mock Chart Data)
  // ========================================

  // 기존 데이터 엔드포인트들
  http.get("/api/data/signups_by_region", () => {
    const data = {
      labels: ["North America", "Europe", "Asia", "South America", "Africa"],
      values: [120, 95, 180, 45, 25],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/orders_over_time", () => {
    const data = {
      labels: [
        "2025-07-01",
        "2025-07-02",
        "2025-07-03",
        "2025-07-04",
        "2025-07-05",
        "2025-07-06",
        "2025-07-07",
      ],
      values: [32, 45, 41, 55, 49, 63, 58],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/total_revenue", () => {
    const data = {
      value: 98123,
      currency: "USD",
      period: "This Month",
      change: "+12.5%",
    };
    return HttpResponse.json(data);
  }),

  // 새로운 데이터 엔드포인트들
  http.get("/api/data/user_demographics", () => {
    const data = {
      labels: ["18-25", "26-35", "36-45", "46-55", "55+"],
      values: [25, 35, 20, 15, 5],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/performance_metrics", () => {
    const data = {
      labels: [
        "Speed",
        "Efficiency",
        "Quality",
        "Innovation",
        "Customer Satisfaction",
      ],
      values: [85, 92, 78, 88, 95],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/sales_correlation", () => {
    const data = [
      { x: 1000, y: 15000, name: "Jan" },
      { x: 1500, y: 22000, name: "Feb" },
      { x: 1200, y: 18000, name: "Mar" },
      { x: 1800, y: 28000, name: "Apr" },
      { x: 2000, y: 32000, name: "May" },
      { x: 1600, y: 25000, name: "Jun" },
      { x: 2200, y: 35000, name: "Jul" },
      { x: 1900, y: 29000, name: "Aug" },
    ];
    return HttpResponse.json(data);
  }),

  http.get("/api/data/monthly_growth", () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      values: [5.2, 7.8, 6.1, 8.9, 12.3, 10.7, 14.2],
    };
    return HttpResponse.json(data);
  }),

  // 추가 샘플 데이터 엔드포인트들
  http.get("/api/data/browser_usage", () => {
    const data = {
      labels: ["Chrome", "Firefox", "Safari", "Edge", "Others"],
      values: [65, 15, 12, 6, 2],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/device_types", () => {
    const data = {
      labels: ["Desktop", "Mobile", "Tablet"],
      values: [45, 40, 15],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/conversion_funnel", () => {
    const data = {
      labels: ["Visitors", "Sign-ups", "Trials", "Purchases", "Renewals"],
      values: [10000, 2500, 1200, 800, 650],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/team_performance", () => {
    const data = {
      labels: [
        "Communication",
        "Productivity",
        "Quality",
        "Collaboration",
        "Innovation",
        "Problem Solving",
      ],
      values: [88, 92, 85, 90, 78, 82],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/website_traffic", () => {
    const data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      values: [1200, 1450, 1380, 1620, 1580, 1750],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/active_users", () => {
    const data = {
      value: 24567,
      currency: "",
      period: "Current Month",
      change: "+8.3%",
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/average_session_duration", () => {
    const data = {
      value: 145,
      currency: "seconds",
      period: "This Week",
      change: "+15.2%",
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/customer_satisfaction", () => {
    const data = {
      value: 4.8,
      currency: "/ 5.0",
      period: "Latest Survey",
      change: "+0.3",
    };
    return HttpResponse.json(data);
  }),

  // 동적 데이터 엔드포인트 (타이틀 기반)
  http.get("/api/data/:slug", ({ params }) => {
    const { slug } = params;

    // 기본 샘플 데이터 반환
    const defaultData = {
      labels: ["Category A", "Category B", "Category C", "Category D"],
      values: [
        Math.floor(Math.random() * 100) + 20,
        Math.floor(Math.random() * 100) + 20,
        Math.floor(Math.random() * 100) + 20,
        Math.floor(Math.random() * 100) + 20,
      ],
    };

    // slug가 숫자로 끝나는 경우 단일 값 반환
    if (slug && typeof slug === "string" && /\d$/.test(slug)) {
      return HttpResponse.json({
        value: Math.floor(Math.random() * 10000) + 1000,
        currency: "",
        period: "Current Period",
        change: `+${(Math.random() * 20).toFixed(1)}%`,
      });
    }

    return HttpResponse.json(defaultData);
  }),

  // ========================================
  // Error Handling for Unmatched Routes
  // ========================================

  // 404 처리를 위한 catch-all (선택사항)
  http.get("/api/*", () => {
    return HttpResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }),

  http.post("/api/*", () => {
    return HttpResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }),

  http.put("/api/*", () => {
    return HttpResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }),

  http.delete("/api/*", () => {
    return HttpResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }),
];

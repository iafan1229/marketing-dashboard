import { http, HttpResponse } from "msw";
import { mockDb } from "@/lib/mockDb";

export const handlers = [
  // Dashboard endpoints
  http.get("/api/dashboards", () => {
    const dashboards = mockDb.dashboards.getAll();
    return HttpResponse.json(dashboards);
  }),

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

  http.post("/api/dashboards", async ({ request }) => {
    const body = (await request.json()) as any;

    // Validation
    if (!body.name || typeof body.name !== "string") {
      return HttpResponse.json(
        { error: "Dashboard name is required and must be a string" },
        { status: 400 }
      );
    }

    const dashboard = mockDb.dashboards.create({
      name: body.name.trim(),
      charts: body.charts || [],
    });

    return HttpResponse.json(dashboard, { status: 201 });
  }),

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

  // Chart endpoints
  http.get("/api/charts", () => {
    const charts = mockDb.charts.getAll();
    return HttpResponse.json(charts);
  }),

  http.get("/api/charts/:id", ({ params }) => {
    const { id } = params;
    const chart = mockDb.charts.getById(id as string);

    if (!chart) {
      return HttpResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    return HttpResponse.json(chart);
  }),

  http.post("/api/charts", async ({ request }) => {
    const body = (await request.json()) as any;

    // Validation
    if (!body.dashboardId || typeof body.dashboardId !== "string") {
      return HttpResponse.json(
        { error: "Dashboard ID is required and must be a string" },
        { status: 400 }
      );
    }

    if (
      !body.type ||
      !["bar", "line", "number", "pie", "area"].includes(body.type)
    ) {
      return HttpResponse.json(
        {
          error: "Chart type is required and must be one of: bar, line, number",
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

    // Check if dashboard exists
    const dashboard = mockDb.dashboards.getById(body.dashboardId);
    if (!dashboard) {
      return HttpResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
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

  http.put("/api/charts/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as any;

    const existingChart = mockDb.charts.getById(id as string);
    if (!existingChart) {
      return HttpResponse.json({ error: "Chart not found" }, { status: 404 });
    }

    // Validation
    if (
      body.type !== undefined &&
      !["bar", "line", "number"].includes(body.type)
    ) {
      return HttpResponse.json(
        { error: "Chart type must be one of: bar, line, number" },
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

    const updates: any = {};
    if (body.type !== undefined) updates.type = body.type;
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.order !== undefined) updates.order = body.order;
    if (body.dataEndpoint !== undefined)
      updates.dataEndpoint = body.dataEndpoint;

    const updatedChart = mockDb.charts.update(id as string, updates);

    if (!updatedChart) {
      return HttpResponse.json(
        { error: "Failed to update chart" },
        { status: 500 }
      );
    }

    return HttpResponse.json(updatedChart);
  }),

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

  // Data endpoints
  http.get("/api/data/signups_by_region", () => {
    const data = {
      labels: ["North America", "Europe", "Asia"],
      values: [120, 95, 180],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/orders_over_time", () => {
    const data = {
      labels: ["2025-07-01", "2025-07-02", "2025-07-03"],
      values: [32, 45, 41],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/data/total_revenue", () => {
    const data = {
      value: 98123,
    };
    return HttpResponse.json(data);
  }),
];

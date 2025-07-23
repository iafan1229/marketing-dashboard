import { Dashboard, Chart } from "@/types/api";

// Mock database - in-memory storage
let dashboards: Dashboard[] = [
  {
    id: "dashboard-1",
    name: "Marketing KPIs",
    charts: ["chart-1", "chart-2"],
    createdAt: "2025-07-20T10:00:00Z",
    updatedAt: "2025-07-20T10:00:00Z",
  },
  {
    id: "dashboard-2",
    name: "Sales Overview",
    charts: ["chart-3"],
    createdAt: "2025-07-19T14:30:00Z",
    updatedAt: "2025-07-19T14:30:00Z",
  },
];

let charts: Chart[] = [
  {
    id: "chart-1",
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Signups by Region",
    dataEndpoint: "/api/data/signups_by_region",
    order: 0,
    createdAt: "2025-07-20T10:00:00Z",
    updatedAt: "2025-07-20T10:00:00Z",
  },
  {
    id: "chart-2",
    dashboardId: "dashboard-1",
    type: "line",
    title: "Orders Over Time",
    dataEndpoint: "/api/data/orders_over_time",
    order: 1,
    createdAt: "2025-07-20T10:05:00Z",
    updatedAt: "2025-07-20T10:05:00Z",
  },
  {
    id: "chart-3",
    dashboardId: "dashboard-2",
    type: "number",
    title: "Total Revenue",
    dataEndpoint: "/api/data/total_revenue",
    order: 0,
    createdAt: "2025-07-19T14:30:00Z",
    updatedAt: "2025-07-19T14:30:00Z",
  },
];

export const mockDb = {
  // Dashboard operations
  dashboards: {
    getAll: (): Dashboard[] => dashboards,

    getById: (id: string): Dashboard | undefined => {
      return dashboards.find((d) => d.id === id);
    },

    create: (
      data: Omit<Dashboard, "id" | "createdAt" | "updatedAt">
    ): Dashboard => {
      const newDashboard: Dashboard = {
        ...data,
        id: `dashboard-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        charts: data.charts || [],
      };
      dashboards.push(newDashboard);
      return newDashboard;
    },

    update: (
      id: string,
      updates: Partial<Omit<Dashboard, "id" | "createdAt">>
    ): Dashboard | null => {
      const index = dashboards.findIndex((d) => d.id === id);
      if (index === -1) return null;

      dashboards[index] = {
        ...dashboards[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return dashboards[index];
    },

    delete: (id: string): boolean => {
      const index = dashboards.findIndex((d) => d.id === id);
      if (index === -1) return false;

      // Delete associated charts
      charts = charts.filter((c) => c.dashboardId !== id);
      dashboards.splice(index, 1);
      return true;
    },
  },

  // Chart operations
  charts: {
    getAll: (): Chart[] => charts,

    getById: (id: string): Chart | undefined => {
      return charts.find((c) => c.id === id);
    },

    getByDashboardId: (dashboardId: string): Chart[] => {
      return charts
        .filter((c) => c.dashboardId === dashboardId)
        .sort((a, b) => a.order - b.order);
    },

    create: (data: Omit<Chart, "id" | "createdAt" | "updatedAt">): Chart => {
      const newChart: Chart = {
        ...data,
        id: `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      charts.push(newChart);

      // Add chart ID to dashboard's charts array
      const dashboard = dashboards.find((d) => d.id === data.dashboardId);
      if (dashboard) {
        dashboard.charts.push(newChart.id);
        dashboard.updatedAt = new Date().toISOString();
      }

      return newChart;
    },

    update: (
      id: string,
      updates: Partial<Omit<Chart, "id" | "createdAt">>
    ): Chart | null => {
      const index = charts.findIndex((c) => c.id === id);
      if (index === -1) return null;

      charts[index] = {
        ...charts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return charts[index];
    },

    delete: (id: string): boolean => {
      const index = charts.findIndex((c) => c.id === id);
      if (index === -1) return false;

      const chart = charts[index];

      // Remove chart ID from dashboard's charts array
      const dashboard = dashboards.find((d) => d.id === chart.dashboardId);
      if (dashboard) {
        dashboard.charts = dashboard.charts.filter((chartId) => chartId !== id);
        dashboard.updatedAt = new Date().toISOString();
      }

      charts.splice(index, 1);
      return true;
    },

    getNextOrder: (dashboardId: string): number => {
      const dashboardCharts = charts.filter(
        (c) => c.dashboardId === dashboardId
      );
      return dashboardCharts.length > 0
        ? Math.max(...dashboardCharts.map((c) => c.order)) + 1
        : 0;
    },
  },

  // Reset for testing
  reset: () => {
    dashboards = [];
    charts = [];
  },
};

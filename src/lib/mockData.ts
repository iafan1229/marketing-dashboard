// lib/mockData.ts
import { Dashboard, Chart } from "@/types/api";

// Mock database - in a real app this would be a proper database
const dashboards: Dashboard[] = [
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

// Utility functions
export function getAllDashboards(): Dashboard[] {
  return dashboards;
}

export function getDashboardById(id: string): Dashboard | undefined {
  return dashboards.find((d) => d.id === id);
}

export function createDashboard(
  dashboard: Omit<Dashboard, "id" | "createdAt" | "updatedAt">
): Dashboard {
  const newDashboard: Dashboard = {
    ...dashboard,
    id: `dashboard-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dashboards.push(newDashboard);
  return newDashboard;
}

export function updateDashboard(
  id: string,
  updates: Partial<Omit<Dashboard, "id" | "createdAt">>
): Dashboard | null {
  const index = dashboards.findIndex((d) => d.id === id);
  if (index === -1) return null;

  dashboards[index] = {
    ...dashboards[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return dashboards[index];
}

export function deleteDashboard(id: string): boolean {
  const index = dashboards.findIndex((d) => d.id === id);
  if (index === -1) return false;

  // Also delete associated charts
  charts = charts.filter((c) => c.dashboardId !== id);
  dashboards.splice(index, 1);
  return true;
}

export function getAllCharts(): Chart[] {
  return charts;
}

export function getChartById(id: string): Chart | undefined {
  return charts.find((c) => c.id === id);
}

export function getChartsByDashboardId(dashboardId: string): Chart[] {
  return charts
    .filter((c) => c.dashboardId === dashboardId)
    .sort((a, b) => a.order - b.order);
}

export function createChart(
  chart: Omit<Chart, "id" | "createdAt" | "updatedAt">
): Chart {
  const newChart: Chart = {
    ...chart,
    id: `chart-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  charts.push(newChart);

  // Add chart ID to dashboard's charts array
  const dashboard = getDashboardById(chart.dashboardId);
  if (dashboard) {
    dashboard.charts.push(newChart.id);
    updateDashboard(dashboard.id, { charts: dashboard.charts });
  }

  return newChart;
}

export function updateChart(
  id: string,
  updates: Partial<Omit<Chart, "id" | "createdAt">>
): Chart | null {
  const index = charts.findIndex((c) => c.id === id);
  if (index === -1) return null;

  charts[index] = {
    ...charts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return charts[index];
}

export function deleteChart(id: string): boolean {
  const index = charts.findIndex((c) => c.id === id);
  if (index === -1) return false;

  const chart = charts[index];

  // Remove chart ID from dashboard's charts array
  const dashboard = getDashboardById(chart.dashboardId);
  if (dashboard) {
    dashboard.charts = dashboard.charts.filter((chartId) => chartId !== id);
    updateDashboard(dashboard.id, { charts: dashboard.charts });
  }

  charts.splice(index, 1);
  return true;
}

// Helper function to generate next order for charts in a dashboard
export function getNextChartOrder(dashboardId: string): number {
  const dashboardCharts = getChartsByDashboardId(dashboardId);
  return dashboardCharts.length > 0
    ? Math.max(...dashboardCharts.map((c) => c.order)) + 1
    : 0;
}

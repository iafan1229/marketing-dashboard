import { create } from "zustand";
import { Dashboard, Chart } from "@/types/dashboard";

interface StoreState {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  charts: Chart[];

  setDashboards: (dashboards: Dashboard[]) => void;
  setCurrentDashboard: (dashboard: Dashboard | null) => void;
  addDashboard: (dashboard: Dashboard) => void;
  updateDashboard: (id: string, updates: Partial<Dashboard>) => void;
  deleteDashboard: (id: string) => void;

  setCharts: (charts: Chart[]) => void;
  addChart: (chart: Chart) => void;
  updateChart: (id: string, updates: Partial<Chart>) => void;
  deleteChart: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  dashboards: [],
  currentDashboard: null,
  charts: [],

  setDashboards: (dashboards) => set({ dashboards }),
  setCurrentDashboard: (dashboard) => set({ currentDashboard: dashboard }),
  addDashboard: (dashboard) =>
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    })),
  updateDashboard: (id, updates) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    })),
  deleteDashboard: (id) =>
    set((state) => ({
      dashboards: state.dashboards.filter((d) => d.id !== id),
    })),

  setCharts: (charts) => set({ charts }),
  addChart: (chart) =>
    set((state) => ({
      charts: [...state.charts, chart],
    })),
  updateChart: (id, updates) =>
    set((state) => ({
      charts: state.charts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  deleteChart: (id) =>
    set((state) => ({
      charts: state.charts.filter((c) => c.id !== id),
    })),
}));

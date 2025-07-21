export interface Chat {
  id: string;
  name: string;
  owner: string;
  ownerAvatar?: string;
  created: string;
  lastModified: string;
  isOwn?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: ChartType;
  value: number | number[];
  label: string;
  description?: string;
  data?: any;
}

export type ChartType = "line" | "bar" | "pie" | "area" | "metric";

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  data?: number[];
}

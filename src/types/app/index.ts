export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Chat {
  id: string;
  name: string;
  owner: string;
  ownerAvatar?: string;
  created: string;
  lastModified: string;
  isOwn?: boolean;
}

export interface ChartData {
  id: string;
  title: string;
  type: ChartType;
  value: number | number[];
  label: string;
  description?: string;
  data?: Array<number | string> | Record<string, number | string>;
}

export type ChartType = "line" | "bar" | "pie" | "area" | "metric";

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  data?: Array<number | string> | Record<string, number | string>;
}

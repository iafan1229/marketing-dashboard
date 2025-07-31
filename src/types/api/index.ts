// src/types/api/index.ts

export interface Dashboard {
  id: string;
  name: string;
  charts: string[]; // Array of chart IDs
  createdAt: string;
  updatedAt: string;
}

export interface Chart {
  id: string;
  dashboardId: string;
  type: "bar" | "line" | "number" | "pie" | "area";
  title: string;
  dataEndpoint: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChartData {
  labels?: string[];
  values?: number[];
  value?: number;
  currency?: string;
  period?: string;
  change?: string;
}

export interface CreateDashboardRequest {
  name: string;
  charts?: string[];
}

export interface UpdateDashboardRequest {
  name?: string;
  charts?: string[];
}

export interface CreateChartRequest {
  dashboardId: string;
  type: "bar" | "line" | "number";
  title: string;
  dataEndpoint?: string;
  order?: number;
}

export interface UpdateChartRequest {
  type?: "bar" | "line" | "number";
  title?: string;
  dataEndpoint?: string;
  order?: number;
}

export interface ApiError {
  error: string;
}

export interface ApiSuccess {
  message: string;
}

// UI Component Props
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

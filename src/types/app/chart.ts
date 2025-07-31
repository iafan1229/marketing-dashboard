export type ChartType =
  | "bar"
  | "line"
  | "number"
  | "pie"
  | "area"
  | "donut"
  | "radar"
  | "scatter";

export interface ChartFormData {
  title: string;
  type: "bar" | "line" | "number" | "";
  dataEndpoint: string;
  order: number;
}

export interface MockApiOption {
  value: string;
  label: string;
  type: "bar" | "line" | "number";
  description: string;
}

export interface ChartTypeOption {
  value: "bar" | "line" | "number" | "pie" | "area";
  label: string;
}

export interface ChartFormProps {
  chart: ChartFormData;
  onChange: (index: number, chart: ChartFormData) => void;
  onDelete: (index: number) => void;
  index: number;
}

export interface DashboardCreateProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  charts: ChartFormData[];
  setCharts: (charts: ChartFormData[]) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: () => void;
}

// Mock API 옵션들
export const MOCK_API_OPTIONS: MockApiOption[] = [
  {
    value: "/api/data/signups_by_region",
    label: "Signups by Region",
    type: "bar",
    description: "Regional signup data - regional signup data",
  },
  {
    value: "/api/data/orders_over_time",
    label: "Orders Over Time",
    type: "line",
    description: "Time series order data - time series order data",
  },
  {
    value: "/api/data/total_revenue",
    label: "Total Revenue",
    type: "number",
    description: "Single revenue metric - single revenue metric",
  },
];

export const CHART_TYPE_OPTIONS: ChartTypeOption[] = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "number", label: "Number/Metric" },
  { value: "pie", label: "Pie Chart" },
  { value: "area", label: "Area Chart" },
];

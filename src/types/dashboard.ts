export interface Dashboard {
  id: string;
  name: string;
  charts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Chart {
  id: string;
  dashboardId: string;
  type:
    | "bar"
    | "line"
    | "number"
    | "pie"
    | "area"
    | "donut"
    | "radar"
    | "scatter"
    | "metric";
  title: string;
  dataEndpoint: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// 2. src/types/app/chart.ts - 차트 관련 타입 및 옵션 확장
export type ChartType =
  | "bar"
  | "line"
  | "number"
  | "pie"
  | "area"
  | "donut"
  | "radar"
  | "scatter"
  | "metric";

export interface ChartFormData {
  title: string;
  type: ChartType | "";
  dataEndpoint: string;
  order: number;
}

export interface ChartTypeOption {
  value: ChartType;
  label: string;
  description: string;
}

export const CHART_TYPE_OPTIONS: ChartTypeOption[] = [
  {
    value: "bar",
    label: "Bar Chart",
    description: "Categorical data comparison",
  },
  {
    value: "line",
    label: "Line Chart",
    description: "Time series and trend data",
  },
  {
    value: "area",
    label: "Area Chart",
    description: "Filled line chart for volume data",
  },
  {
    value: "pie",
    label: "Pie Chart",
    description: "Part-to-whole relationships",
  },
  {
    value: "donut",
    label: "Donut Chart",
    description: "Pie chart with center space",
  },
  {
    value: "radar",
    label: "Radar Chart",
    description: "Multi-dimensional data comparison",
  },
  {
    value: "scatter",
    label: "Scatter Plot",
    description: "Correlation between two variables",
  },
  {
    value: "number",
    label: "Number/KPI",
    description: "Single key metric display",
  },
  {
    value: "metric",
    label: "Advanced Metric",
    description: "Enhanced metric with trends",
  },
];

export interface ChartFormProps {
  chart: ChartFormData; // ✅ ChartFormData를 참조하므로 자동으로 업데이트됨
  onChange: (index: number, chart: ChartFormData) => void;
  onDelete: (index: number) => void;
  index: number;
}

export interface DashboardCreateProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  charts: ChartFormData[]; // ✅ ChartFormData[]를 참조하므로 자동으로 업데이트됨
  setCharts: (charts: ChartFormData[]) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: () => void;
}

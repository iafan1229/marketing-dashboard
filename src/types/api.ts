import { ChartType } from "./dashboard";

export interface MockApiOption {
  value: string;
  label: string;
  type: ChartType[];
  description: string;
}

// 확장된 Mock API 옵션 (다양한 차트 타입 지원)
export const MOCK_API_OPTIONS: MockApiOption[] = [
  {
    value: "/api/data/signups_by_region",
    label: "Signups by Region",
    type: ["bar", "pie", "donut"],
    description:
      "Regional signup data - works best with bar, pie, or donut charts",
  },
  {
    value: "/api/data/orders_over_time",
    label: "Orders Over Time",
    type: ["line", "area", "bar"],
    description: "Time series order data - ideal for line, area, or bar charts",
  },
  {
    value: "/api/data/total_revenue",
    label: "Total Revenue",
    type: ["number", "metric"],
    description: "Single revenue metric - perfect for number or metric display",
  },
  {
    value: "/api/data/user_demographics",
    label: "User Demographics",
    type: ["pie", "donut", "bar"],
    description:
      "User demographic breakdown - great for pie, donut, or bar charts",
  },
  {
    value: "/api/data/performance_metrics",
    label: "Performance Metrics",
    type: ["radar", "bar"],
    description:
      "Multi-dimensional performance data - ideal for radar or bar charts",
  },
  {
    value: "/api/data/sales_correlation",
    label: "Sales vs Marketing Spend",
    type: ["scatter", "line"],
    description: "Correlation data - perfect for scatter plots or line charts",
  },
  {
    value: "/api/data/monthly_growth",
    label: "Monthly Growth Rate",
    type: ["area", "line", "metric"],
    description:
      "Growth trend data - works well with area, line, or metric charts",
  },
  {
    value: "/api/data/browser_usage",
    label: "Browser Usage",
    type: ["pie", "donut", "bar"],
    description: "Browser market share - ideal for pie, donut, or bar charts",
  },
  {
    value: "/api/data/device_types",
    label: "Device Types",
    type: ["pie", "donut", "bar"],
    description:
      "Device usage breakdown - perfect for pie, donut, or bar charts",
  },
  {
    value: "/api/data/active_users",
    label: "Active Users",
    type: ["number", "metric"],
    description:
      "Current active user count - best for number or metric display",
  },
];

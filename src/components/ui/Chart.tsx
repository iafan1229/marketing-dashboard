import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartType } from "@/types/app/chart";

interface ChartProps {
  type: ChartType;
  data?: any[];
  value?: number | number[];
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({
  type,
  data = [],
  value,
  title,
  width,
  height = 200,
  className = "",
}) => {
  const colors = [
    "#7fdccb",
    "#bb54a8",
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
  ];

  // Generate default data if none provided
  const chartData = data.length > 0 ? data : generateDefaultData(type, value);

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <LineChart data={chartData}>
              <Line
                type='monotone'
                dataKey='value'
                stroke='#7fdccb'
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#7fdccb" }}
              />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis hide />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <BarChart data={chartData}>
              <Bar dataKey='value' fill='#bb54a8' radius={[4, 4, 0, 0]} />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis hide />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={height / 3}
                innerRadius={height / 6}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#7fdccb' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#7fdccb' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line
                type='monotone'
                dataKey='value'
                stroke='#7fdccb'
                strokeWidth={2}
                fill='url(#areaGradient)'
                dot={false}
              />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis hide />
            </LineChart>
          </ResponsiveContainer>
        );

      case "metric":
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>
            {title && <div className='text-sm text-gray-500'>{title}</div>}
          </div>
        );

      default:
        return (
          <div className='flex items-center justify-center h-full text-gray-400'>
            No chart available
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${className}`} style={{ width, height }}>
      {renderChart()}
    </div>
  );
};

function generateDefaultData(type: ChartType, value?: number | number[]) {
  switch (type) {
    case "line":
    case "area":
      if (Array.isArray(value)) {
        return value.map((v, i) => ({ name: `Point ${i + 1}`, value: v }));
      }
      return [
        { name: "Jan", value: 20 },
        { name: "Feb", value: 30 },
        { name: "Mar", value: 25 },
        { name: "Apr", value: 40 },
        { name: "May", value: 35 },
        { name: "Jun", value: 45 },
        { name: "Jul", value: 50 },
      ];

    case "bar":
      return [
        { name: "A", value: 30 },
        { name: "B", value: 45 },
        { name: "C", value: 25 },
        { name: "D", value: 60 },
        { name: "E", value: 35 },
      ];

    case "pie":
      return [
        { name: "Email", value: 25 },
        { name: "Social Media", value: 30 },
        { name: "Paid Ads", value: 20 },
        { name: "Organic Search", value: 25 },
      ];

    default:
      return [];
  }
}

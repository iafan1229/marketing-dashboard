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
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts";
import { ChartType } from "@/types/dashboard";

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
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#84cc16",
  ];

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

      case "area":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#7fdccb' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#7fdccb' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='value'
                stroke='#7fdccb'
                strokeWidth={2}
                fill='url(#areaGradient)'
              />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis hide />
            </AreaChart>
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

      case "donut":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={height / 6}
                outerRadius={height / 3}
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

      case "radar":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey='name' tick={{ fontSize: 10 }} />
              <PolarRadiusAxis hide />
              <Radar
                dataKey='value'
                stroke='#7fdccb'
                fill='#7fdccb'
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <ScatterChart data={chartData}>
              <XAxis dataKey='x' type='number' hide />
              <YAxis dataKey='y' type='number' hide />
              <Scatter dataKey='y' fill='#bb54a8' />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "number":
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>
            {title && <div className='text-sm text-gray-500'>{title}</div>}
          </div>
        );

      case "metric":
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-4xl font-bold text-brand-purple mb-2'>
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>
            {title && <div className='text-sm text-gray-500 mb-2'>{title}</div>}
            <div className='flex items-center text-xs text-green-600'>
              <svg
                className='w-3 h-3 mr-1'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              +12.5% vs last period
            </div>
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
      return [
        { name: "Jan", value: 20 },
        { name: "Feb", value: 30 },
        { name: "Mar", value: 25 },
        { name: "Apr", value: 40 },
        { name: "May", value: 35 },
        { name: "Jun", value: 45 },
      ];

    case "bar":
      return [
        { name: "A", value: 30 },
        { name: "B", value: 45 },
        { name: "C", value: 25 },
        { name: "D", value: 60 },
      ];

    case "pie":
    case "donut":
      return [
        { name: "Desktop", value: 45 },
        { name: "Mobile", value: 35 },
        { name: "Tablet", value: 20 },
      ];

    case "radar":
      return [
        { name: "Speed", value: 85 },
        { name: "Quality", value: 90 },
        { name: "Efficiency", value: 75 },
        { name: "Innovation", value: 80 },
        { name: "Satisfaction", value: 95 },
      ];

    case "scatter":
      return [
        { x: 100, y: 200, name: "A" },
        { x: 120, y: 300, name: "B" },
        { x: 170, y: 250, name: "C" },
        { x: 140, y: 400, name: "D" },
        { x: 150, y: 350, name: "E" },
      ];

    default:
      return [];
  }
}

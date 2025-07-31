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
  CartesianGrid,
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
  // 새로운 props: 축 레이블
  xAxisLabel?: string;
  yAxisLabel?: string;
  unit?: string; // 단위 (예: "$", "%", "개")
}

export const Chart: React.FC<ChartProps> = ({
  type,
  data = [],
  value,
  title,
  width,
  height = 200,
  className = "",
  xAxisLabel,
  yAxisLabel,
  unit = "",
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

  // Y축 공통 스타일
  const yAxisProps = {
    tickLine: false,
    tick: {
      fontSize: 11,
      fill: "#9ca3af",
      fontWeight: 500,
    },
    axisLine: {
      stroke: "lightgray",
      strokeWidth: 1,
    },
    tickFormatter: (value: number) => {
      // 숫자 포맷팅 + 단위 추가
      let formattedValue = "";
      if (value >= 1000000) {
        formattedValue = `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        formattedValue = `${(value / 1000).toFixed(0)}K`;
      } else {
        formattedValue = value.toString();
      }
      return unit ? `${formattedValue}${unit}` : formattedValue;
    },
    // width: 45, // Y축 레이블 때문에 너비 증가
    // Y축 레이블 추가
    label: undefined,
  };

  // X축 공통 스타일
  const xAxisProps = {
    tickLine: false,
    tick: {
      fontSize: 11,
      fill: "#6b7280",
      fontWeight: 500,
    },
    axisLine: {
      stroke: "lightgray",
      strokeWidth: 1,
    },
    // height: 45, // X축 레이블 때문에 높이 증가
    // X축 레이블 추가
    label: xAxisLabel
      ? {
          value: xAxisLabel,
          position: "insideBottom",
          offset: -5,
          style: {
            textAnchor: "middle",
            fontSize: "12px",
            fill: "#6b7280",
            fontWeight: 600,
            // position: "absolute", // 절대 위치
            // bottom: "10px", // 하단에서 10px
            // left: "50%", // 가로 중앙
            // transform: "translateX(-50%)", // 중앙 정렬
          },
        }
      : undefined,
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <>
            <ResponsiveContainer width='100%' height={height}>
              <LineChart
                data={chartData}
                // width={512}
                margin={{
                  top: 10,
                  right: 10,
                  // left: yAxisLabel ? 20 : 10, // 레이블이 있으면 여백 증가
                  bottom: xAxisLabel ? 20 : 10,
                }}
              >
                {/* 격자 추가 (선택사항) */}
                <CartesianGrid
                  strokeDasharray='3 3'
                  stroke='#f3f4f6'
                  vertical={false}
                />
                <Line
                  type='monotone'
                  dataKey='value'
                  stroke='#7fdccb'
                  strokeWidth={2.5}
                  dot={{ fill: "#7fdccb", strokeWidth: 0, r: 3 }}
                  activeDot={{
                    r: 5,
                    fill: "#7fdccb",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                />
                <XAxis dataKey='name' {...xAxisProps} />
                <YAxis {...yAxisProps} />
              </LineChart>
            </ResponsiveContainer>
          </>
        );

      case "bar":
        return (
          <ResponsiveContainer width='100%' height={height}>
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                // left: yAxisLabel ? 20 : 10,
                bottom: xAxisLabel ? 20 : 10,
              }}
            >
              {/* 격자 추가 (선택사항) */}
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#f3f4f6'
                vertical={false}
              />
              <Bar
                dataKey='value'
                fill='#bb54a8'
                radius={[3, 3, 0, 0]}
                maxBarSize={40}
              />
              <XAxis dataKey='name' {...xAxisProps} />
              <YAxis {...yAxisProps} />
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
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
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
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                // left: yAxisLabel ? 20 : 10,
                bottom: xAxisLabel ? 20 : 10,
              }}
            >
              <defs>
                <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#7fdccb' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#7fdccb' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#f3f4f6'
                vertical={false}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='#7fdccb'
                strokeWidth={2.5}
                fill='url(#areaGradient)'
                dot={{ fill: "#7fdccb", strokeWidth: 0, r: 3 }}
                activeDot={{
                  r: 5,
                  fill: "#7fdccb",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
              <XAxis dataKey='name' {...xAxisProps} />
              <YAxis {...yAxisProps} />
            </LineChart>
          </ResponsiveContainer>
        );

      case "metric":
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>
              {typeof value === "number"
                ? `${value.toLocaleString()}${unit}`
                : value}
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
    <div className={`w-full h-full ${className}`} style={{ width, height }}>
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
        { name: "Jan", value: 4200 },
        { name: "Feb", value: 3800 },
        { name: "Mar", value: 4500 },
        { name: "Apr", value: 5200 },
        { name: "May", value: 4800 },
        { name: "Jun", value: 5500 },
        { name: "Jul", value: 6100 },
      ];

    case "bar":
      return [
        { name: "North America", value: 12000 },
        { name: "Europe", value: 8500 },
        { name: "Asia", value: 15000 },
        { name: "South America", value: 4200 },
        { name: "Africa", value: 3100 },
      ];

    case "pie":
      return [
        { name: "Email", value: 2500 },
        { name: "Social Media", value: 3000 },
        { name: "Paid Ads", value: 2000 },
        { name: "Organic Search", value: 2500 },
      ];

    default:
      return [];
  }
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dashboard, Chart as ChartType } from "@/types/api";

export const useDashboardDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [charts, setCharts] = useState<ChartType[]>([]);
  const [chartData, setChartData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchDashboard();
    }
  }, [params.id]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // 대시보드 정보 가져오기
      const dashboardResponse = await fetch(`/api/dashboards/${params.id}`);
      if (!dashboardResponse.ok) {
        throw new Error("대시보드를 찾을 수 없습니다.");
      }
      const dashboardData = await dashboardResponse.json();
      setDashboard(dashboardData);

      // 차트 목록 가져오기
      const chartsResponse = await fetch("/api/charts");
      if (!chartsResponse.ok) {
        throw new Error("차트 데이터를 가져올 수 없습니다.");
      }
      const allCharts = await chartsResponse.json();
      const dashboardCharts = allCharts
        .filter((chart: ChartType) => chart.dashboardId === params.id)
        .sort((a: ChartType, b: ChartType) => a.order - b.order);

      setCharts(dashboardCharts);

      // 각 차트의 데이터 가져오기
      const dataPromises = dashboardCharts.map(async (chart: ChartType) => {
        try {
          const response = await fetch(chart.dataEndpoint);
          if (response.ok) {
            const data = await response.json();
            return { chartId: chart.id, data };
          }
        } catch (error) {
          console.error(`Failed to fetch data for chart ${chart.id}:`, error);
        }
        return { chartId: chart.id, data: null };
      });

      const dataResults = await Promise.all(dataPromises);
      const dataMap: Record<string, any> = {};
      dataResults.forEach(({ chartId, data }) => {
        dataMap[chartId] = data;
      });
      setChartData(dataMap);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setError(error instanceof Error ? error.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDashboard = async () => {
    if (!confirm("정말로 이 대시보드를 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/dashboards/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("대시보드 삭제에 실패했습니다.");
      }

      router.push("/dashboard/list");
    } catch (error) {
      console.error("Error deleting dashboard:", error);
      alert("대시보드 삭제 중 오류가 발생했습니다.");
    }
  };

  return {
    dashboard,
    charts,
    chartData,
    loading,
    error,
    handleDeleteDashboard,
    router,
  };
};

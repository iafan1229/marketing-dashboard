// src/app/dashboard/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chart } from "@/components/ui/Chart";
import { Dashboard, Chart as ChartType } from "@/types/api";

export default function DashboardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
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

  const renderChart = (chart: ChartType) => {
    const data = chartData[chart.id];

    if (!data) {
      return (
        <div className='flex items-center justify-center h-64 text-gray-500'>
          데이터를 불러오는 중...
        </div>
      );
    }

    // 차트 타입에 따라 데이터 형식 변환
    if (chart.type === "number") {
      return (
        <div className='flex flex-col items-center justify-center h-64'>
          <div className='text-4xl font-bold text-gray-900 mb-2'>
            {typeof data.value === "number"
              ? data.value.toLocaleString()
              : data.value}
          </div>
          <div className='text-sm text-gray-500'>{chart.title}</div>
        </div>
      );
    }

    // bar, line 차트용 데이터 변환 - 변수명 변경
    const formattedData: any =
      data.labels?.map((label: string, index: number) => ({
        name: label,
        value: data.values?.[index] || 0,
      })) || [];

    return (
      <Chart
        type={chart.type as any}
        data={formattedData} // 변경된 변수명 사용
        height={300}
        title={chart.title}
      />
    );
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center'>
            <div className='text-red-600 text-lg mb-4'>
              {error || "대시보드를 찾을 수 없습니다."}
            </div>
            <Button onClick={() => router.push("/dashboard/list")}>
              Back to Dashboard List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* 대시보드 헤더 */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {dashboard.name}
              </h1>
              <div className='flex items-center space-x-4 text-sm text-gray-500'>
                <span>생성일: {formatDate(dashboard.createdAt)}</span>
                <span>•</span>
                <span>수정일: {formatDate(dashboard.updatedAt)}</span>
                <span>•</span>
                <span>{charts.length}개의 차트</span>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <Button
                variant='outline'
                onClick={() => router.push("/dashboard/list")}
              >
                Back to Dashboard List
              </Button>
              {/* {session && (
                <Button
                  variant='ghost'
                  onClick={handleDeleteDashboard}
                  className='text-red-600 hover:text-red-800 hover:bg-red-50'
                >
                  삭제
                </Button>
              )} */}
            </div>
          </div>
        </div>

        {/* 차트 그리드 */}
        {charts.length === 0 ? (
          <Card className='p-12 text-center'>
            <div className='text-gray-500 mb-4'>
              This dashboard has no charts yet.
            </div>
            {session && (
              <Button onClick={() => router.push("/dashboard/create")}>
                Create New Dashboard
              </Button>
            )}
          </Card>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {charts.map((chart) => (
              <Card
                key={chart.id}
                className='p-6 hover:shadow-lg transition-shadow'
              >
                <div className='mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                    {chart.title}
                  </h3>
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span className='capitalize'>{chart.type} 차트</span>
                    <span>#{chart.order + 1}</span>
                  </div>
                </div>

                <div className='border border-gray-100 rounded-lg p-4 bg-gray-50'>
                  {renderChart(chart)}
                </div>

                <div className='mt-3 text-xs text-gray-400'>
                  업데이트: {formatDate(chart.updatedAt)}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 대시보드 정보 카드 */}
        <Card className='mt-8 p-6 bg-blue-50 border-blue-200'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-blue-800'>
                Dashboard Information
              </h3>
              <div className='mt-2 text-sm text-blue-700'>
                <p>
                  This dashboard is made up of{" "}
                  <strong>{charts.length} charts</strong> and visualize
                  real-time data.
                </p>
                <div className='mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs'>
                  <div>
                    <span className='font-medium'>Bar 차트: </span>
                    {charts.filter((c) => c.type === "bar").length}개
                  </div>
                  <div>
                    <span className='font-medium'>Line 차트: </span>
                    {charts.filter((c) => c.type === "line").length}개
                  </div>
                  <div>
                    <span className='font-medium'>Number 차트: </span>
                    {charts.filter((c) => c.type === "number").length}개
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

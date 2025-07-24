"use client";

import { ChartFormData } from "@/types/dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useDashboardCreate = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [charts, setCharts] = useState<ChartFormData[]>([
    {
      title: "",
      type: "",
      dataEndpoint: "",
      order: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("대시보드 제목을 입력해주세요.");
      return;
    }

    const incompleteCharts = charts.some(
      (chart) => !chart.title.trim() || !chart.type || !chart.dataEndpoint
    );

    if (incompleteCharts) {
      setError("모든 차트의 제목, 타입, 데이터 소스를 설정해주세요.");
      return;
    }

    if (!session?.user) {
      setError("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. 대시보드 생성
      const dashboardResponse = await fetch("/api/dashboards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          description,
          user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
        }),
      });

      if (!dashboardResponse.ok) {
        throw new Error("대시보드 생성에 실패했습니다.");
      }

      const newDashboard = await dashboardResponse.json();

      // 2. 각 차트 생성
      for (const chart of charts) {
        const chartResponse = await fetch("/api/charts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dashboardId: newDashboard.id,
            type: chart.type,
            title: chart.title,
            dataEndpoint: chart.dataEndpoint,
            order: chart.order,
          }),
        });

        if (!chartResponse.ok) {
          throw new Error("차트 생성에 실패했습니다.");
        }
      }

      router.push("/");
    } catch (error) {
      console.error("Dashboard creation error:", error);
      setError("대시보드 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    charts,
    setCharts,
    isLoading,
    error,
    handleSubmit,
  };
};

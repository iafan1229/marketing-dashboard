"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ListItem {
  id: string;
  name: string;
  charts: string[];
  createdAt: string;
  updatedAt: string;
}

export const useDashboardList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = 10;

  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // URL 파라미터 변경 감지
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  // 초기 로드 + 페이지 변경시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // API call (replace with actual API endpoint)
        const response = await fetch("/api/dashboards");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // currentPage가 1이든 2든 항상 실행
  }, [currentPage]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // 페이지 변경 핸들러

  const handlePageChange = (page: number) => {
    // URL만 변경하면 useEffect에서 자동으로 state 업데이트됨
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`/dashboard/list?${params.toString()}`);
  };

  // 대시보드 생성 페이지로 이동
  const handleCreateDashboard = () => {
    router.push("/dashboard/create");
  };

  // 대시보드 상세 페이지로 이동
  const handleViewDashboard = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  return {
    items,
    currentItems,
    loading,
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
    handleCreateDashboard,
    handleViewDashboard,
  };
};

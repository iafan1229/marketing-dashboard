"use client";

import { useState, useEffect, useMemo } from "react";
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

  // Get current page from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
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

    fetchData();
  }, []);

  // Pagination calculation
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Page change handler
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/dashboard/list?${params.toString()}`);
  };

  // Navigate to create page
  const handleCreateDashboard = () => {
    router.push("/dashboard/create");
  };

  // Navigate to dashboard detail
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

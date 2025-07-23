"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

interface ListItem {
  id: string;
  name: string;
  charts: string[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListContainerInner />
    </Suspense>
  );
}

const ListContainerInner: React.FC = () => {
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

  // Status badge styles (removed - not needed for this data structure)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg text-gray-600'>Loading data...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Dashboard List
            </h1>
            <p className='text-gray-600'>
              Total {items.length} dashboards available.
            </p>
          </div>

          {/* Result info and Add button */}
          <div className='mb-4 flex justify-between items-center'>
            <div className='text-sm text-gray-600'>
              {items.length > 0 ? (
                <>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, items.length)} of{" "}
                  {items.length} dashboards
                </>
              ) : (
                "No dashboards found"
              )}
            </div>
            <button
              onClick={() => router.push("/dashboard/create")}
              className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap'
            >
              Add New Dashboard
            </button>
          </div>

          {/* List */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            {currentItems.length > 0 ? (
              <>
                {/* Table header */}
                <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                  <div className='grid grid-cols-12 gap-4 text-sm font-medium text-gray-700'>
                    <div className='col-span-4'>Dashboard Name</div>
                    <div className='col-span-3'>Charts Count</div>
                    <div className='col-span-3'>Created Date</div>
                    <div className='col-span-2'>Actions</div>
                  </div>
                </div>

                {/* List items */}
                <div className='divide-y divide-gray-200'>
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className='px-6 py-4 hover:bg-gray-50 transition-colors'
                    >
                      <div className='grid grid-cols-12 gap-4 items-center'>
                        <div className='col-span-4'>
                          <h3 className='font-medium text-gray-900 mb-1'>
                            {item.name}
                          </h3>
                          {/* <p className='text-xs text-gray-500'>ID: {item.id}</p> */}
                        </div>

                        <div className='col-span-3'>
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                            {item.charts.length} Charts
                          </span>
                        </div>

                        <div className='col-span-3'>
                          <p className='text-sm text-gray-600'>
                            {formatDate(item.createdAt)}
                          </p>
                          <p className='text-xs text-gray-500'>
                            Updated: {formatDate(item.updatedAt)}
                          </p>
                        </div>

                        <div className='col-span-2'>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() =>
                                router.push(`/dashboard/${item.id}`)
                              }
                              className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                            >
                              View
                            </button>
                            {/* <button
                              onClick={() =>
                                router.push(`/dashboard/{item.id}/edit`)
                              }
                              className='text-gray-600 hover:text-gray-800 text-sm font-medium'
                            >
                              Edit
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='text-center py-12 text-gray-500'>
                No dashboards created yet.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showPageNumbers={true}
              maxVisiblePages={5}
            />
          )}
        </div>
      </div>
    </div>
  );
};

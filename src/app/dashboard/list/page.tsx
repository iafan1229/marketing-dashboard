// src/app/dashboard/list/page.tsx - 대시보드 목록 페이지
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dashboard } from "@/types/api";
import { Header } from "@/components/ui/Header";
import { useSession } from "next-auth/react";

export default function DashboardListPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      const response = await fetch("/api/dashboards");
      const data = await response.json();
      setDashboards(data);
    } catch (error) {
      console.error("Failed to fetch dashboards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dashboard?")) return;

    try {
      await fetch(`/api/dashboards/${id}`, { method: "DELETE" });
      setDashboards(dashboards.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete dashboard:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='text-gray-500'>Loading dashboards...</div>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* Header */}
            <div className='flex justify-between items-center'>
              <div>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  Dashboards
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage your data visualizations
                </p>
              </div>
              {session ? (
                <Link href='/dashboard/create' className='btn-primary'>
                  + New Dashboard
                </Link>
              ) : (
                <Link href='/login' className='btn-primary'>
                  + New Dashboard
                </Link>
              )}
            </div>

            {/* Search and Filter */}
            <div className='flex items-center justify-between'>
              <div className='relative flex-1 max-w-md'>
                <input
                  type='text'
                  placeholder='Search in Dashboards'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
              </div>

              <div className='flex items-center space-x-4'>
                <select className='px-3 py-2 border border-gray-300 rounded-lg text-sm'>
                  <option>Owner</option>
                  <option>All Users</option>
                  <option>Me</option>
                </select>
                <select className='px-3 py-2 border border-gray-300 rounded-lg text-sm'>
                  <option>Last Modified</option>
                  <option>Created Date</option>
                  <option>Name</option>
                </select>
              </div>
            </div>

            {/* Dashboard Table */}
            <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
              <table className='w-full'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      <input type='checkbox' className='rounded' />
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Owner
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Created
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Last Modified
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {dashboards.map((dashboard) => (
                    <tr key={dashboard.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4'>
                        <input type='checkbox' className='rounded' />
                      </td>
                      <td className='px-6 py-4'>
                        <Link
                          href={`/dashboard/${dashboard.id}`}
                          className='text-blue-600 hover:text-blue-800 font-medium'
                        >
                          {dashboard.name}
                        </Link>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3'>
                            <span className='text-white text-sm font-medium'>
                              U
                            </span>
                          </div>
                          <span className='text-gray-900'>Current User</span>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-gray-500'>
                        {formatDate(dashboard.createdAt)}
                      </td>
                      <td className='px-6 py-4 text-gray-500'>
                        {formatDate(dashboard.updatedAt)}
                      </td>
                      <td className='px-6 py-4'>
                        <div className='relative'>
                          <button
                            onClick={() => handleDelete(dashboard.id)}
                            className='text-gray-400 hover:text-gray-600'
                          >
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className='bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between'>
                <div className='text-sm text-gray-500'>
                  Showing {dashboards.length} of {dashboards.length}
                </div>
                <div className='flex items-center space-x-2'>
                  <select className='px-2 py-1 border border-gray-300 rounded text-sm'>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <div className='flex space-x-1'>
                    <button className='px-3 py-1 bg-blue-600 text-white rounded text-sm'>
                      1
                    </button>
                    <button className='px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm'>
                      2
                    </button>
                    <button className='px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm'>
                      3
                    </button>
                    <span className='px-3 py-1 text-gray-400'>...</span>
                    <button className='px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm'>
                      10
                    </button>
                    <button className='px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm'>
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";

interface ListItem {
  id: string;
  name: string;
  charts: string[];
  createdAt: string;
  updatedAt: string;
}

interface DashboardListPresenterProps {
  items: ListItem[];
  currentItems: ListItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  handleCreateDashboard: () => void;
  handleViewDashboard: (id: string) => void;
}

export const DashboardListPresenter: React.FC<DashboardListPresenterProps> = ({
  items,
  currentItems,
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  handlePageChange,
  handleCreateDashboard,
  handleViewDashboard,
}) => {
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
    return <Loading text='Loading Data...' />;
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
            <Button onClick={handleCreateDashboard} variant='primary' size='lg'>
              Add New Dashboard
            </Button>
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
                            <Button
                              onClick={() => handleViewDashboard(item.id)}
                              variant='ghost'
                              size='sm'
                            >
                              View
                            </Button>
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

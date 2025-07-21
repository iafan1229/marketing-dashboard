import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DataViz - Dashboard Builder",
  description: "Create and manage interactive dashboards with charts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='min-h-screen bg-gray-50'>
          {/* Top Navigation */}
          <nav className='bg-white border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between items-center h-16'>
                {/* Logo and Navigation */}
                <div className='flex items-center space-x-8'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gray-900 rounded flex items-center justify-center'>
                      <span className='text-white text-sm font-bold'>▲</span>
                    </div>
                    <span className='text-xl font-semibold text-gray-900'>
                      DataView
                    </span>
                  </div>

                  <div className='hidden md:flex space-x-1'>
                    <Link href='/' className='nav-item-active'>
                      Dashboards
                    </Link>
                    <Link href='#' className='nav-item'>
                      Reports
                    </Link>
                    <Link href='#' className='nav-item'>
                      Explore
                    </Link>
                  </div>
                </div>

                {/* Search and Actions */}
                <div className='flex items-center space-x-4'>
                  <div className='hidden md:block'>
                    <div className='relative'>
                      <input
                        type='text'
                        placeholder='Search'
                        className='w-80 pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                  </div>

                  <button className='p-2 text-gray-400 hover:text-gray-600'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                      />
                    </svg>
                  </button>

                  <div className='w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>3</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

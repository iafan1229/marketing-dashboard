// src/app/page.tsx - 메인 랜딩 페이지
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Header } from "@/components/ui/Header";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <Header />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <div className='text-center py-20'>
          <h1 className='text-5xl font-bold text-gray-900 mb-6'>
            Transform Your Data Into
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              {" "}
              Insights
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Create stunning dashboards, visualize complex data, and make
            data-driven decisions with our powerful analytics platform.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {session ? (
              <>
                <Link
                  href='/dashboard/list'
                  className='btn-primary text-lg px-8 py-3'
                >
                  View My Dashboards
                </Link>
                <Link
                  href='/dashboard/create'
                  className='btn-secondary text-lg px-8 py-3'
                >
                  Create New Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href='/login' className='btn-primary text-lg px-8 py-3'>
                  Get Started
                </Link>
                <Link
                  href='/dashboard/list'
                  className='btn-secondary text-lg px-8 py-3'
                >
                  Explore Dashboards
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className='py-20'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Powerful Features for Modern Analytics
            </h2>
            <p className='text-lg text-gray-600'>
              Everything you need to turn data into actionable insights
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Interactive Charts
              </h3>
              <p className='text-gray-600'>
                Create beautiful, interactive visualizations with our
                comprehensive chart library. From simple bar charts to complex
                heatmaps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Real-time Updates
              </h3>
              <p className='text-gray-600'>
                Keep your dashboards current with real-time data updates. Never
                miss important changes in your metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Team Collaboration
              </h3>
              <p className='text-gray-600'>
                Share dashboards with your team, set permissions, and
                collaborate on data analysis in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='py-20'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white'>
            <h2 className='text-3xl font-bold mb-4'>
              Ready to Start Analyzing?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Join thousands of teams already using our platform to make better
              decisions.
            </p>
            {session ? (
              <Link
                href='/dashboard/create'
                className='inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors'
              >
                Create Your First Dashboard
              </Link>
            ) : (
              <Link
                href='/login'
                className='inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors'
              >
                Get Started Now
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold mb-4'>Dashboard Analytics</h3>
            <p className='text-gray-400'>
              © 2024 Dashboard Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

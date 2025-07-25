// src/app/page.tsx - 메인 랜딩 페이지
"use client";

import { useSession } from "next-auth/react";
import { Header } from "@/components/ui/Header";
import { MainCard } from "@/components/ui/MainCard";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

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
                <Button
                  onClick={() => router.push("/dashboard/list")}
                  variant='primary'
                  size='lg'
                >
                  View My Dashboards
                </Button>
                <Button
                  onClick={() => router.push("/dashboard/create")}
                  variant='secondary'
                  size='lg'
                >
                  Create New Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  variant='primary'
                  size='lg'
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => router.push("/dashboard/list")}
                  variant='secondary'
                  size='lg'
                >
                  Explore Dashboards
                </Button>
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
            <MainCard
              title='Interactive Charts'
              description='Create beautiful, interactive visualizations with our comprehensive chart library. From simple bar charts to complex heatmaps.'
            />

            {/* Feature 2 */}
            <MainCard
              title='Real-time Updates'
              description='Keep your dashboards current with real-time data updates. Never miss important changes in your metrics.'
            />

            {/* Feature 3 */}
            <MainCard
              title='Team Collaboration'
              description='Share dashboards with your team, set permissions, and collaborate on data analysis in real-time.'
            />
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
              <Button
                onClick={() => router.push("/dashboard/create")}
                size='lg'
                variant='white'
              >
                Create Your First Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                size='lg'
                variant='white'
              >
                Get Started Now
              </Button>
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

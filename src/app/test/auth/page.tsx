// src/app/test/auth/page.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const testScenarios = [
    {
      title: "로그인하지 않은 상태에서 대시보드 생성 시도",
      description: "로그인 페이지로 리다이렉트되어야 함",
      action: () => router.push("/dashboard/create"),
      buttonText: "대시보드 생성 페이지로 이동",
    },
    {
      title: "Google 로그인 직접 테스트",
      description: "Google 로그인 후 /dashboard/create로 이동",
      action: () => signIn("google", { callbackUrl: "/dashboard/create" }),
      buttonText: "Google 로그인",
      disabled: status === "authenticated",
    },
    {
      title: "로그인 페이지로 이동",
      description: "커스텀 로그인 페이지 테스트",
      action: () => router.push("/login"),
      buttonText: "로그인 페이지로 이동",
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            NextAuth 인증 테스트 페이지
          </h1>
          <p className='text-gray-600'>
            인증 플로우를 테스트할 수 있는 다양한 시나리오를 제공합니다
          </p>
        </div>

        {/* 현재 인증 상태 */}
        <Card className='mb-8 p-6'>
          <h2 className='text-xl font-semibold mb-4'>현재 인증 상태</h2>

          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              <span className='font-medium'>상태:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === "authenticated"
                    ? "bg-green-100 text-green-800"
                    : status === "loading"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status === "authenticated"
                  ? "로그인됨"
                  : status === "loading"
                  ? "로딩 중"
                  : "로그인 안됨"}
              </span>
            </div>

            {session?.user && (
              <>
                <div className='flex items-center space-x-3'>
                  <span className='font-medium'>사용자:</span>
                  <div className='flex items-center space-x-2'>
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt='User Avatar'
                        className='w-6 h-6 rounded-full'
                      />
                    )}
                    <span>{session.user.name || "이름 없음"}</span>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <span className='font-medium'>이메일:</span>
                  <span>{session.user.email}</span>
                </div>

                <div className='flex items-center space-x-3'>
                  <span className='font-medium'>사용자 ID:</span>
                  <span className='font-mono text-sm bg-gray-100 px-2 py-1 rounded'>
                    {session.user.id}
                  </span>
                </div>
              </>
            )}
          </div>

          {session && (
            <div className='mt-4'>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant='outline'
              >
                로그아웃
              </Button>
            </div>
          )}
        </Card>

        {/* 테스트 시나리오들 */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testScenarios.map((scenario, index) => (
            <Card key={index} className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>{scenario.title}</h3>
              <p className='text-gray-600 text-sm mb-4'>
                {scenario.description}
              </p>

              <Button
                onClick={scenario.action}
                disabled={scenario.disabled}
                className='w-full'
                variant={scenario.disabled ? "outline" : "primary"}
              >
                {scenario.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* 플로우 설명 */}
        <Card className='mt-8 p-6'>
          <h2 className='text-xl font-semibold mb-4'>예상 인증 플로우</h2>
          <div className='space-y-4'>
            <div className='flex items-start space-x-3'>
              <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center justify-center'>
                1
              </span>
              <div>
                <p className='font-medium'>대시보드 생성 버튼 클릭</p>
                <p className='text-sm text-gray-600'>
                  메인 페이지에서 New Dashboard 또는 대시보드 생성 버튼 클릭
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center justify-center'>
                2
              </span>
              <div>
                <p className='font-medium'>인증 확인</p>
                <p className='text-sm text-gray-600'>
                  미들웨어가 /dashboard/create 접근을 차단하고 로그인 페이지로
                  리다이렉트
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center justify-center'>
                3
              </span>
              <div>
                <p className='font-medium'>Google 로그인</p>
                <p className='text-sm text-gray-600'>
                  사용자가 Google 계정으로 로그인
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <span className='flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center justify-center'>
                4
              </span>
              <div>
                <p className='font-medium'>대시보드 생성 페이지 접근</p>
                <p className='text-sm text-gray-600'>
                  로그인 성공 후 /dashboard/create 페이지로 자동 이동
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 환경 설정 체크리스트 */}
        <Card className='mt-8 p-6'>
          <h2 className='text-xl font-semibold mb-4'>환경 설정 체크리스트</h2>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              <input type='checkbox' className='rounded' />
              <span className='text-sm'>GOOGLE_CLIENT_ID 환경변수 설정</span>
            </div>
            <div className='flex items-center space-x-3'>
              <input type='checkbox' className='rounded' />
              <span className='text-sm'>
                GOOGLE_CLIENT_SECRET 환경변수 설정
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <input type='checkbox' className='rounded' />
              <span className='text-sm'>
                NEXTAUTH_URL 환경변수 설정 (http://localhost:3000)
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <input type='checkbox' className='rounded' />
              <span className='text-sm'>NEXTAUTH_SECRET 환경변수 설정</span>
            </div>
            <div className='flex items-center space-x-3'>
              <input type='checkbox' className='rounded' />
              <span className='text-sm'>
                Google OAuth 콘솔에서 리다이렉트 URI 설정
              </span>
            </div>
          </div>

          <div className='mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md'>
            <p className='text-sm text-yellow-800'>
              <strong>참고:</strong> 실제 테스트를 위해서는 Google OAuth 설정과
              환경변수가 필요합니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

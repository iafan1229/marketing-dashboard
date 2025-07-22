"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPresenter } from "./LoginPresenter";
import { useLogin } from "./useLogin";

export function LoginContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, error, handleGoogleLogin } = useLogin();

  useEffect(() => {
    // 이미 로그인된 사용자는 create 페이지로
    if (status === "authenticated" && session) {
      router.push("/dashboard/create");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (session) {
    return null; // 리다이렉트 중
  }

  return (
    <LoginPresenter
      isLoading={isLoading}
      error={error}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}

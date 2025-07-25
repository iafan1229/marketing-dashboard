"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPresenter } from "./LoginPresenter";
import { useLogin } from "./useLogin";
import { Loading } from "@/components/ui/Loading";

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
    return <Loading />;
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

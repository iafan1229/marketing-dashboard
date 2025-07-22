import { useState } from "react";
import { signIn } from "next-auth/react";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard/create", // 바로 Create 페이지로
        redirect: false,
      });

      if (result?.error) {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleGoogleLogin,
  };
}

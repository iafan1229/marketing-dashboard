import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/useStore";

export function useDashboardCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const { addDashboard } = useStore();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("대시보드 제목을 입력해주세요.");
      return;
    }

    if (!session?.user) {
      setError("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("대시보드 생성에 실패했습니다.");
      }

      const newDashboard = await response.json();
      addDashboard(newDashboard);

      router.push("/");
    } catch (error) {
      console.error("Dashboard creation error:", error);
      setError("대시보드 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    isLoading,
    error,
    handleSubmit,
  };
}

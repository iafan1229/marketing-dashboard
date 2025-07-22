"use client";

import { useSession } from "next-auth/react";
import { DashboardCreatePresenter } from "./DashboardCreatePresenter";
import { useDashboardCreate } from "./useDashboardCreate";

export function DashboardCreateContainer() {
  const { data: session, status } = useSession();
  const dashboardCreate = useDashboardCreate();

  // middleware가 이미 인증을 체크했으므로 로딩만 처리
  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return <DashboardCreatePresenter {...dashboardCreate} />;
}

"use client";

import { useSession } from "next-auth/react";
import { DashboardCreatePresenter } from "./DashboardCreatePresenter";
import { useDashboardCreate } from "./useDashboardCreate";

export const DashboardCreateContainer = () => {
  const { data: session, status } = useSession();
  const dashboardCreate = useDashboardCreate();

  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return <DashboardCreatePresenter {...dashboardCreate} />;
};

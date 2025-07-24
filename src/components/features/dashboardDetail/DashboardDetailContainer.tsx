"use client";

import { useSession } from "next-auth/react";
import { DashboardDetailPresenter } from "./DashboardDetailPresenter";
import { useDashboardDetail } from "./useDashboardDetail";

export const DashboardDetailContainer = () => {
  const { data: session } = useSession();
  const dashboardDetail = useDashboardDetail();

  return <DashboardDetailPresenter session={session} {...dashboardDetail} />;
};

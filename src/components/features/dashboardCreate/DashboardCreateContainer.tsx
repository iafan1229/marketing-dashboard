"use client";

import { useSession } from "next-auth/react";
import { DashboardCreatePresenter } from "./DashboardCreatePresenter";
import { useDashboardCreate } from "./useDashboardCreate";
import { Loading } from "@/components/ui/Loading";

export const DashboardCreateContainer = () => {
  const { data: session, status } = useSession();
  const dashboardCreate = useDashboardCreate();

  if (status === "loading") {
    return <Loading />;
  }

  return <DashboardCreatePresenter {...dashboardCreate} />;
};

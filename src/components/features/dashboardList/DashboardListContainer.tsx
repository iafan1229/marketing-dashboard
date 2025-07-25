"use client";

import { Suspense } from "react";
import { useDashboardList } from "./useDashboardList";
import { DashboardListPresenter } from "./dashboardListPresenter";

export const DashboardListContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardListInner />
    </Suspense>
  );
};

const DashboardListInner: React.FC = () => {
  const dashboardList = useDashboardList();

  return <DashboardListPresenter {...dashboardList} />;
};

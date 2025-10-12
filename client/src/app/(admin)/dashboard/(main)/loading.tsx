import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="space-y-1 mb-8">
      <Skeleton className="h-10 w-4/5 animate-pulse" />
      <Skeleton className="h-6 w-2/5 animate-pulse" />
    </div>
  );
};

export default DashboardLoading;

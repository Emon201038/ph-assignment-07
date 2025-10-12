import { DashboardHeader } from "@/components/dashboard-header";
import React from "react";

export const metadata = {
  title: "Dashboard | Emon's Portfolio",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-12">
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;

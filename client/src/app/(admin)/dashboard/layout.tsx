import { auth } from "@/auth";
import { DashboardHeader } from "@/components/dashboard-header";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Dashboard | Emon's Portfolio",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.token) {
    redirect("/login?redirect=/dashboard");
  }
  return (
    <div className="mt-12">
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;

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
    <div className="mt-26 ">
      <DashboardHeader />
      <div className=" w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

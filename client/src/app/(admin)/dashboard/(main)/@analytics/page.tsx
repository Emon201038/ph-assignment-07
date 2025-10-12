import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats } from "@/lib/fetch-data";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Analytics = async () => {
  const session = await auth();
  if (!session?.token) {
    redirect("/login?redirect=/dashboard");
  }
  const res = await getAdminStats({
    headers: {
      authorization: session.token,
    },
    next: { tags: ["stats"] },
  });

  const statsArray = Object.entries(res.data).map(([key, value]) => ({
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    value,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsArray.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Analytics;

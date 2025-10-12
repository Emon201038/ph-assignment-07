import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const StatsLoading = () => {
  const statsArray = [
    { label: "Total Projects", value: 0 },
    { label: "Total Blogs", value: 0 },
    { label: "Total Active Projects", value: 0 },
    { label: "Total Published Blogs", value: 0 },
    { label: "Total Featured Blogs", value: 0 },
    { label: "Total Featured Projects", value: 0 },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsArray.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="text-2xl font-bold w-8 h-8 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsLoading;

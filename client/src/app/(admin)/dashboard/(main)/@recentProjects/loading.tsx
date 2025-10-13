import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const RecentProjectsLoading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription className="mt-1">
              Your latest work and updates
            </CardDescription>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2].map((project) => (
          <div
            key={project}
            className="group flex flex-col gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:shadow-sm sm:flex-row"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted sm:w-48">
              <Skeleton className="h-full w-full object-contain animate-pulse" />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Skeleton className="h-6 animate-pulse"></Skeleton>
                    <Skeleton className="mt-1 h-3 animate-pulse text-sm text-muted-foreground text-pretty"></Skeleton>
                  </div>
                  <Skeleton className="h-4 w-8 animate-pulse"></Skeleton>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[1, 2, 3].map((tag) => (
                    <Skeleton
                      key={tag}
                      className="w-8 h-4 animate-pulse"
                    ></Skeleton>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Skeleton className="w-5 h-3 animate-pulse"></Skeleton>
                  <Skeleton className="w-8 h-4 animate-pulse"></Skeleton>
                </div>
                <Skeleton className="w-8 h-4 animate-pulse"></Skeleton>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentProjectsLoading;

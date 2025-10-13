import { DashboardCardSkeleton } from "@/components/skeletons/dashboard-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardProjectsLoading() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

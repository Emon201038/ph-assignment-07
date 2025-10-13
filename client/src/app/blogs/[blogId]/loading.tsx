import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Skeleton className="h-10 w-32 mb-8" />

        <div className="space-y-6">
          {/* Title and Meta Skeleton */}
          <div>
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Image Skeleton */}
          <Skeleton className="w-full h-96 rounded-lg" />

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

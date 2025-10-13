import { BlogCardSkeleton } from "@/components/skeletons/blog-card-skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 space-y-4">
          <div className="h-12 w-32 bg-muted animate-pulse rounded" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

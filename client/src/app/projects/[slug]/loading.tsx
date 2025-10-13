import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Skeleton className="h-10 w-32 mb-8" />

        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>

          {/* Image Skeleton */}
          <Skeleton className="w-full h-96 rounded-lg" />

          {/* Info Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-32" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-40" />
              </CardContent>
            </Card>
          </div>

          {/* Tech Stack Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links Skeleton */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-11 w-40" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}

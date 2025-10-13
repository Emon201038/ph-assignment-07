import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function BlogsLoading() {
  return (
    <section id="blog" className="px-6 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-4 w-36" />
          <Button variant="ghost" disabled>
            View All Articles
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

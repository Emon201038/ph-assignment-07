import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsGrid } from "@/components/metrics-grid"
import { RecentProjects } from "@/components/recent-projects"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickActions } from "@/components/quick-actions"
import { BlogPosts } from "@/components/blog-posts"
import { CreateProjectDialog } from "@/components/create-project-dialog"
import { CreateBlogDialog } from "@/components/create-blog-dialog"

export default function DashboardPage() {
  return (
    <div className="mt-12">
      {/* <DashboardHeader /> */}

      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">Welcome back, Alex</h1>
            <p className="mt-2 text-muted-foreground text-pretty">Here's what's happening with your portfolio today</p>
          </div>
          <div className="flex gap-3">
            <CreateBlogDialog />
            <CreateProjectDialog />
          </div>
        </div>

        <div className="space-y-8">
          <MetricsGrid />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <RecentProjects />
              <BlogPosts />
            </div>
            <div className="space-y-8">
              <QuickActions />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

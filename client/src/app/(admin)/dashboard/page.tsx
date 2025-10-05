import { DashboardHeader } from "@/components/dashboard-header";
import { MetricsGrid } from "@/components/metrics-grid";
import { RecentProjects } from "@/components/recent-projects";
import { ActivityFeed } from "@/components/activity-feed";
import { QuickActions } from "@/components/quick-actions";
import { BlogPosts } from "@/components/blog-posts";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { CreateBlogDialog } from "@/components/create-blog-dialog";
import { auth } from "@/lib/session";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderKanban, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const totalBlogs = 4;
  const totalProjects = 2;
  const publishedBlogs = 2;
  const session = await auth();
  if (!session?._id) redirect("/login?redirect=/dashboard");
  return (
    <div className="mt-12">
      {/* <DashboardHeader /> */}

      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Welcome back, Alex
            </h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Here's what's happening with your portfolio today
            </p>
          </div>
          <div className="flex gap-3">
            <CreateBlogDialog />
            <CreateProjectDialog />
            <AuthButton />
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Blog Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBlogs}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Posts
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedBlogs}</div>
              </CardContent>
            </Card>
          </div>

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
  );
}

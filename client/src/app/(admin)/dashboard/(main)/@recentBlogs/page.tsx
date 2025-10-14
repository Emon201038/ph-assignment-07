import { Calendar, Clock, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MoreButton from "@/components/more-button";
import { getBlogs } from "@/lib/fetch-data";

export default async function BlogPosts() {
  const res = await getBlogs(
    {
      page: "1",
      limit: "5",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      next: {
        tags: ["blogs"],
      },
    }
  );

  const blogPosts = res.data.blogs;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription className="mt-1">
              Your published articles and drafts
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {blogPosts.map((post) => (
          <div
            key={post._id}
            className="group rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={post.status === "active" ? "default" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {post.status}
                  </Badge>
                </div>

                <h3 className="font-semibold text-balance mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} minutes read
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {post.views} views
                  </span>
                </div>
              </div>

              <MoreButton slug={post.slug} status={post.status} type="blog" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

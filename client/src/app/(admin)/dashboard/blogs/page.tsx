import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getBlogs } from "@/lib/fetch-data";
import DeleteButton from "../projects/delete-button";

export default async function DashboardBlogsPage() {
  const res = await getBlogs(
    {
      page: "1",
      limit: "99",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    { next: { tags: ["blogs"] } }
  );
  const posts = res.data.blogs;
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-2">
              Manage your blog content
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/blogs/create">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-col">
              <img
                src={post.image.url || "/placeholder.svg"}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <Badge
                    variant={post.status === "active" ? "default" : "secondary"}
                  >
                    {post.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()} •{" "}
                  {post.readTime}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 bg-transparent"
                  >
                    <Link
                      href={`/dashboard/blogs/${post.slug}?isEditMode=true`}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  {post.status === "active" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blogs/${post.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <DeleteButton
                    slug={post.slug}
                    title={post.title}
                    type={"blog"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Button asChild>
                <Link href="/dashboard/blogs/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

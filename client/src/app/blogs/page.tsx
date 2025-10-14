import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/fetch-data";

export default async function BlogPage() {
  const res = await getBlogs(
    {
      page: "1",
      limit: "99",
      sortBy: "createdAt",
      sortOrder: "desc",
      featured: "true",
    },
    { next: { tags: ["blogs"] } }
  );

  const posts = res.data.blogs;
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Articles about web development, design, and technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-col">
              <img
                src={post.image.url || "/placeholder.svg"}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="w-full mt-auto bg-transparent"
                >
                  <Link href={`/blogs/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

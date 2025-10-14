import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  Clock,
  Edit,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { getBlogBySlug } from "@/lib/fetch-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug, { next: { tags: [slug] } });
  const blog = res.data;

  if (!blog) {
    notFound();
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog blogs
            </Link>
          </Button>
        </div>

        <article className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-balance text-4xl font-bold tracking-tight">
                {blog.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </time>
              </div>
              {blog.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime} minutes read</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            <Image
              fill
              src={blog.image.url || "/placeholder.svg"}
              alt={blog.title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{blog.excerpt}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}

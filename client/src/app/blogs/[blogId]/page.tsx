import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogsData } from "@/lib/blogs-data";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";

interface BlogDetailPageProps {
  params: Promise<{
    blogId: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { blogId } = await params;
  const blog = blogsData.find((b) => b.id === Number(blogId));

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
            {blog.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
            {blog.description}
          </p>

          {/* Blog Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Blog Image */}
        <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border/50">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
            fill
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Back to Top */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

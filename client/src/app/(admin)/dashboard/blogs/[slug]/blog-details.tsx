"use client";

import type React from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Calendar, Clock } from "lucide-react";
import BlogForm from "./blog-form";

export default function BlogDetailPage() {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("isEditMode") === "true";

  const post = {
    _id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn the fundamentals of Next.js 15 and build your first application",
    content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements. In this guide, we'll explore the basics and build a simple application.

## What's New in Next.js 15

- Improved performance
- Better developer experience
- Enhanced routing capabilities

## Building Your First App

Let's start by creating a new Next.js project...`,
    image: {
      url: "/nextjs-coding-tutorial.jpg",
    },
    tags: ["Next.js", "React", "Tutorial"],
    published: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
    readTime: "5 min read",
  };

  if (isEditMode) {
    return <BlogForm />;
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog Posts
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/blogs/${post.slug}?isEditMode=true`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Link>
          </Button>
        </div>

        <article className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-balance text-4xl font-bold tracking-tight">
                {post.title}
              </h1>
              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>

          <img
            src={post.image.url || "/placeholder.svg"}
            alt={post.title}
            className="w-full rounded-lg object-cover"
          />

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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
              <p className="text-muted-foreground">{post.excerpt}</p>
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
                    __html: post.content.replace(/\n/g, "<br />"),
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

"use client";

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

export const mockBlogPosts = [
  {
    id: "1",
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
    coverImage: "/nextjs-coding-tutorial.jpg",
    tags: ["Next.js", "React", "Tutorial"],
    published: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    excerpt:
      "Essential TypeScript patterns and practices every developer should know",
    content: `# TypeScript Best Practices for 2024

TypeScript has become essential for modern web development. Here are the best practices you should follow.

## Type Safety

Always prefer strict type checking...`,
    coverImage: "/typescript-code-editor.jpg",
    tags: ["TypeScript", "Best Practices", "Development"],
    published: true,
    createdAt: "2024-02-12",
    updatedAt: "2024-02-12",
    readTime: "8 min read",
  },
  {
    id: "3",
    slug: "building-scalable-apis",
    title: "Building Scalable REST APIs",
    excerpt:
      "A comprehensive guide to designing and building scalable API architectures",
    content: `# Building Scalable REST APIs

Learn how to design APIs that can handle growth and maintain performance.

## API Design Principles

1. Consistency
2. Versioning
3. Documentation...`,
    coverImage: "/api-architecture-diagram.jpg",
    tags: ["API", "Backend", "Architecture"],
    published: true,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01",
    readTime: "10 min read",
  },
];

export default function DashboardBlogsPage() {
  const posts = mockBlogPosts;
  return (
    <div className="px-6 py-8">
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
            <Card key={post.id} className="flex flex-col">
              <img
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
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
                  {post.published && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

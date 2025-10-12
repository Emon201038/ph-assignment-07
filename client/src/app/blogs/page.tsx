"use client";

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

export default function BlogPage() {
  const posts = [
    {
      id: "1",
      title:
        "Building a Full-Stack Blog App with Next.js, Prisma, and PostgreSQL",
      excerpt:
        "Learn how to build a full-stack blog app with Next.js, Prisma, and PostgreSQL.",
      coverImage: "/placeholder.svg",
      slug: "building-a-full-stack-blog-app-with-next-js-prisma-and-postgresql",
      published: true,
      createdAt: new Date(),
      readTime: "5 min read",
      tags: ["Next.js", "Prisma", "PostgreSQL"],
      
    },
  ];
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
          {posts
            .filter((post) => post.published)
            .map((post) => (
              <Card key={post.id} className="flex flex-col">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
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
                    <Link href={`/blog/${post.slug}`}>
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

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CreateBlogForm from "./form";

export default function CreateBlogPage() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog Posts
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Blog Post
          </h1>
          <p className="text-muted-foreground mt-2">
            Write a new article for your blog
          </p>
        </div>

        <CreateBlogForm />
      </div>
    </div>
  );
}

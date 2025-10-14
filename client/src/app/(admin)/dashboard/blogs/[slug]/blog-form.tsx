import { invalidateCache } from "@/actions";
import { Editor } from "@/components/editor";
import { RHFInput } from "@/components/rhf-input";
import { RHFSelect } from "@/components/rhf-select";
import { RHFTextarea } from "@/components/rhf-textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { IBlog } from "@/types";
import { updateBlogSchema, UpdateBlogSchemaType } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BlogForm = ({ post }: { post: IBlog }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("isEditMode") === "true";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(","),
      readTime: post.readTime.toString(),
      status: post.status,
      featured: post.featured,
    },
  });

  const handleSubmit = async (value: UpdateBlogSchemaType) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/${post.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: session?.data?.token as string,
          },
          body: JSON.stringify(value),
          credentials: "include",
        }
      );
      if (!response.ok) {
        toast.error("Failed to update blog");
      } else {
        const data = await response.json();
        toast.success("Project updated successfully");
        await invalidateCache(post.slug);
        await invalidateCache("blogs");
        router.push(`/dashboard/blogs/${data?.data?.slug}?isEditMode=false`);
      }
    } catch (error) {
      toast.error(
        "Failed to update project. Reason: " + (error as Error).message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = async (file: File) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        formData.append(
          "api_key",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`
        );
        formData.append("timestamp", `${Date.now()}`);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        return data;
      } catch (error) {
        toast.error("Failed to upload image");
        console.log(error);
      }
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-muted-foreground mt-2">
            Update your blog post content
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  Update the information about your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RHFInput
                  name="title"
                  control={form.control}
                  placeholder="My Awesome Blog Post"
                  label="Blog Title *"
                />
                <RHFTextarea
                  name="excerpt"
                  control={form.control}
                  placeholder="a brief summary of your post"
                  label="Excerpt *"
                />

                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <Editor
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          onImageUpload={handleImageChange}
                          placeholder="A brif description of the project"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <RHFInput
                    name="tags"
                    control={form.control}
                    label="Tags *"
                    placeholder="React, Tutorial, Web Dev"
                  />
                  <RHFInput
                    name="readTime"
                    control={form.control}
                    label="Read Time (minutes) *"
                    placeholder="10"
                    type="number"
                  />
                </div>

                <FormField
                  name="featured"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Publish Post</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this post visible on your blog
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <RHFSelect
                  control={form.control}
                  name="status"
                  label="Status *"
                  placeholder="Select a status"
                  options={[
                    { id: "1", label: "Active", value: "active" },
                    { id: "2", label: "Draft", value: "draft" },
                    { id: "3", label: "Archived", value: "archived" },
                  ]}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link
                      href={`/dashboard/blogs/${post.slug}?isEditMode=false`}
                    >
                      Cancel
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;

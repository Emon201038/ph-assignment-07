"use client";
import { invalidateCache } from "@/actions";
import { Editor } from "@/components/editor";
import { RHFInput } from "@/components/rhf-input";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createBlogSchema, CreateBlogSchemaType } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateBlogForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      readTime: "",
      status: "active",
      image: undefined,
      featured: false,
    },
  });
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (value: CreateBlogSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating project...");
    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("excerpt", value.excerpt);
      formData.append("content", value.content); // File object
      formData.append("tags", value.tags);
      formData.append("readTime", value.readTime.toString());
      formData.append("status", value.status);
      formData.append("featured", value.featured.toString());
      formData.append("image", value.image);

      const res = await fetch(`${serverUrl}/api/v1/blog`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          authorization: session?.data?.token as string,
        },
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Blog created successfull.", { id: toastId });
        form.reset();
        invalidateCache("blogs");
        invalidateCache("stats");
        router.push(`/dashboard/blogs/${data.data.slug}`);
      } else {
        toast.error("Failed to create blog. Reason: " + data?.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create Blog. " + (error as any)?.message);
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
        console.log(error);
        toast.error("Failed to upload image");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Fill in the information about your blog post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RHFInput
              control={form.control}
              name="title"
              label="Title *"
              placeholder="My awesome Blog post"
            />
            <RHFTextarea
              name="excerpt"
              control={form.control}
              placeholder="A brief summary of your post"
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
                      placeholder="Details content of your post"
                      onImageUpload={handleImageChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Supports Markdown formatting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Blog Image</FormLabel>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="flex-1"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
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
                description="Comma-separated list"
              />
              <RHFInput
                name="readTime"
                control={form.control}
                label="Read Time *"
                placeholder="Enter read time in minutes"
                description="(In minutes)"
                type="number"
              />
            </div>

            <FormField
              name="featured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <FormLabel className="space-y-0.5">
                    <h1>Publish Post</h1>
                    <p className="text-sm text-muted-foreground">
                      Make this post visible on your blog
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Creating..." : "Create Post"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/blogs">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CreateBlogForm;

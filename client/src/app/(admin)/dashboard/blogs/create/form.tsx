"use client";
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
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

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

  const handleSubmit = async (value: CreateBlogSchemaType) => {
    setIsSubmitting(true);

    try {
      console.log(value);
    } catch (error) {
      console.error("Failed to create blog post:", error);
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
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
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
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} value={field.value?.name} />
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
                description="Comma-separated list"
              />
              <RHFInput
                name="readTime"
                control={form.control}
                label="Tags *"
                placeholder="Enter read time in minutes"
                description="(In minutes)"
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

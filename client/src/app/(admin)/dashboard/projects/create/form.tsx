"use client";
import { invalidateCache } from "@/actions";
import { Editor } from "@/components/editor";
import { RHFInput } from "@/components/rhf-input";
import { RHFSelect } from "@/components/rhf-select";
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
import {
  createProjectSchema,
  CreateProjectSchemaType,
} from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const serverUrl = process.env.NEXT_PUBLIC_API_URL;
const CreateProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      github: "",
      live: "",
      details: {
        duration: {
          start: new Date().toISOString().split("T")[0],
          end: new Date().toISOString().split("T")[0],
        },
        features: "",
        role: "",
        techStack: "",
        status: "active",
        tags: "",
      },
      featured: false,
    },
  });

  const handleSubmit = async (value: CreateProjectSchemaType) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating project...");
    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("image", value.image); // File object
      formData.append("github", value.github);
      formData.append("live", value.live);
      formData.append("featured", value.featured.toString());

      // For nested objects, stringify them
      formData.append(
        "details",
        JSON.stringify(value.details, (key, value) => (value ? value : ""))
      );
      const res = await fetch(`${serverUrl}/api/v1/project`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          authorization: session?.data?.token as string,
        },
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Project created successfull.", { id: toastId });
        form.reset();
        invalidateCache("projects");
        invalidateCache("stats");
        router.push(`/dashboard/projects/${data.data.slug}`);
      } else {
        toast.error("Failed to create project. Reason: " + data?.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create Project. " + (error as any)?.message);
    } finally {
      setIsLoading(false);
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
    <Card className="max-w-4xl my-8 mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Add a new project to your portfolio. Fill in the details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <RHFInput
              control={form.control}
              name="title"
              label="Project Title *"
              placeholder="E-commerce Platform"
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Project Description *</FormLabel>
                  <FormControl>
                    <Editor
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      onImageUpload={handleImageChange}
                      placeholder="A brif description of the project"
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
                  <FormLabel>Project Image</FormLabel>
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

            <RHFInput
              control={form.control}
              name="live"
              label="Demo url *"
              placeholder="https://example.com"
              type="url"
            />
            <RHFInput
              control={form.control}
              name="github"
              label="Github url *"
              placeholder="https://github.com/username/repo"
              type="url"
            />
            <RHFInput
              control={form.control}
              name="details.techStack"
              label="Tech Stack *"
              placeholder="React, Next.js, TailwindCSS"
              description="Comma-separated Tech stack"
            />
            <RHFInput
              control={form.control}
              name="details.features"
              label="Included Features *"
              placeholder="Dashboard Included, User Role Management"
              description="Comma-separated features"
            />
            <RHFInput
              control={form.control}
              name="details.tags"
              label="Tags"
              placeholder="MERN, NEXT.JS"
              description="Comma-separated tags"
            />
            <RHFSelect
              control={form.control}
              name="details.status"
              label="Status *"
              placeholder="Select a status"
              options={[
                { id: "1", label: "Active", value: "active" },
                { id: "2", label: "Draft", value: "draft" },
                { id: "3", label: "Archived", value: "archived" },
              ]}
            />

            <div className="flex gap-4">
              <FormField
                name="details.duration.start"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <FormLabel>Project Duration</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="details.duration.end"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <FormLabel>Project Duration</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="details.role"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="featured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Show this project on the homepage
                    </FormDescription>
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

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProjectForm;

"use client";

import type React from "react";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, ExternalLink, Github, Zap } from "lucide-react";
import { IProject } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProjectSchema,
  UpdateProjectSchemaType,
} from "@/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RHFInput } from "@/components/rhf-input";
import { RHFTextarea } from "@/components/rhf-textarea";
import { Input } from "@/components/ui/input";

export default function ProjectDetailPage({ project }: { project: IProject }) {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("isEditMode") === "true";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      details: {
        duration: {
          start: project.details.duration.start,
          end: project.details.duration.end,
        },
        features: project.details.features.join(", "),
        role: project.details.role,
        techStack: project.details.techStack.join(", "),
        status: project.details.status,
        tags: project.details?.tags?.join(", ") || "",
      },
      live: project.live || "",
      github: project.github || "",
      featured: project.featured,
    },
  });

  const handleSubmit = async (value: UpdateProjectSchemaType) => {
    setIsSubmitting(true);
    try {
      console.log(value);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEditMode) {
    return (
      <div className="px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <Button asChild>
              <Link
                href={`/dashboard/projects/${project.slug}?isEditMode=true`}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold tracking-tight">
                  {project.title}
                </h1>
                {project.featured && <Badge>Featured</Badge>}
              </div>
              <p className="text-lg text-muted-foreground">
                {project.description}
              </p>
            </div>

            <img
              src={project.details.image.url || "/placeholder.svg"}
              alt={project.title}
              className="w-full rounded-lg object-cover"
            />

            <div className="flex flex-wrap gap-2">
              {(project.details.tags || []).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {project.description && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-secondary" />
                  Key Features
                </CardTitle>
                <CardDescription>
                  Explore the main capabilities and functionalities of this
                  project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.details.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4">
              {project.live && (
                <Button asChild>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.github && (
                <Button variant="outline" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground mt-2">
            Update your project information
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Update the information about your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RHFInput
                  control={form.control}
                  name="title"
                  label="Title *"
                  placeholder="My Awesome Project"
                />
                <RHFTextarea
                  control={form.control}
                  name="description"
                  label="Description *"
                  placeholder="A brief description of your project"
                />
                <RHFInput
                  control={form.control}
                  name="details.tags"
                  label="Tags *"
                  placeholder="React, Next.js, Typescript"
                  description="Comma-separated list of technologies"
                />
                <RHFInput
                  control={form.control}
                  name="details.techStack"
                  label="Tech Stack *"
                  placeholder="React, Next.js, Typescript"
                  description="Comma-separated list of technologies"
                />
                <RHFInput
                  control={form.control}
                  name="details.features"
                  label="Features *"
                  placeholder=" User authentication, "
                  description="Comma-separated list of features"
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <RHFInput
                    control={form.control}
                    name="live"
                    label="Live url *"
                    placeholder="https://demo.example.com"
                  />
                  <RHFInput
                    control={form.control}
                    name="github"
                    label="Github url *"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel htmlFor="featured">
                          Featured Project
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Show this project on the homepage
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          id="featured"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    name="details.duration.start"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-2 w-full">
                        <FormLabel>Project Duration</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={new Date(field.value).toLocaleDateString(
                              "en-CA"
                            )}
                          />
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
                          <Input
                            type="date"
                            {...field}
                            value={new Date(field.value).toLocaleDateString(
                              "en-CA"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                      href={`/dashboard/projects/${project.slug}?isEditMode=false`}
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
}

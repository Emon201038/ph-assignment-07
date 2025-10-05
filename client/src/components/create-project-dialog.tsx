"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  createProjectSchema,
  CreateProjectSchemaType,
} from "@/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TagsInput } from "./ui/tags-input";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      tags: [""],
      github: "",
      live: "",
      details: {
        duration: "",
        features: [""],
        role: "",
        techStack: [],
        status: "active",
      },
      featured: false,
    },
  });

  // const {
  //   fields: tagFields,
  //   append: appendTag,
  //   remove: removeTag,
  // } = useFieldArray({
  //   name: "tags",
  // });

  // const {
  //   fields: featureFields,
  //   append: appendFeature,
  //   remove: removeFeature,
  // } = useFieldArray({
  //   name: "details.features",
  // });

  // const handleAddTag = () => {
  //   const trimmed = tagInput.trim();
  //   if (trimmed && !tagFields.some((t) => t.id === trimmed)) {
  //     appendTag(trimmed);
  //     setTagInput("");
  //   }
  // };

  // const handleRemoveTag = (index: number) => {
  //   removeTag(index);
  // };

  const handleSubmit = (value: CreateProjectSchemaType) => {
    // Handle project creation logic here
    console.log("[v0] Project created");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to your portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Commerce Platform" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your project..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <FormField
              name="live"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="github"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Github URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      placeholder="React, Next.js, TailwindCSS"
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="space-y-2">
              <Label htmlFor="tags">Technologies</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add a technology (e.g., React, Next.js)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>

              {tagFields.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tagFields.map((field, index) => (
                    <Badge key={field.id} variant="secondary" className="gap-1">
                      {field.id}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

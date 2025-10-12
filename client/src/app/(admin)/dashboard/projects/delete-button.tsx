"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { invalidateCache } from "@/actions";
import { IProject } from "@/types";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const DeleteButton = ({ project }: { project: IProject }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let toastId = toast.loading(`Deleting project...`);
      const res = await fetch(`${serverUrl}/api/v1/project/${project.slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error(`Failed to delete project. Reason:  ${data?.message}`, {
          id: toastId,
        });
      } else {
        toast.success(data.message, { id: toastId });
        await invalidateCache("projects");
        await invalidateCache("stats");
        await invalidateCache(project.slug);
      }
    } catch (error) {
      toast.error(
        `Failed to delete project. Reason:  ${(error as any)?.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isLoading}>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{project.title}
            &quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;

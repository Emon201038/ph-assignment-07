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
import { useSession } from "next-auth/react";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const DeleteButton = ({
  slug,
  title,
  type = "project",
}: {
  slug: string;
  title: string;
  type: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const toastId = toast.loading(`Deleting ${type}...`);
      const res = await fetch(`${serverUrl}/api/v1/${type}/${slug}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: session?.data?.token as string,
        },
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error(`Failed to delete ${type}. Reason:  ${data?.message}`, {
          id: toastId,
        });
      } else {
        toast.success(data.message, { id: toastId });
        await invalidateCache(`${type}s`);
        await invalidateCache("stats");
        await invalidateCache(slug);
      }
    } catch (error) {
      toast.error(
        `Failed to delete ${type}. Reason:  ${(error as any)?.message}`
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
            Are you sure you want to delete &quot;{title}
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

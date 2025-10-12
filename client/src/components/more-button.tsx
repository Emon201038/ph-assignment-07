"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { invalidateCache } from "@/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const MoreButton = ({
  type = "project",
  slug,
  status,
}: {
  type: string;
  slug: string;
  status: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setOpen(false);
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
        await invalidateCache(type);
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

  const handleArchive = async () => {
    setOpen(false);
    setIsLoading(true);
    const toastId = toast.loading("Archiving project...");

    try {
      const res = await fetch(`${serverUrl}/api/v1/${type}/${slug}/archive`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: session?.data?.token as string,
        },
        body: JSON.stringify({
          archived: status === "archived" ? false : true,
        }),
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error(
          `Failed to ${
            status === "archived" ? "unarchive" : "archive"
          } ${type}. Reason: ${data?.message}`,
          {
            id: toastId,
          }
        );
      } else {
        toast.success(`${data.message}`, { id: toastId });
        await invalidateCache(`${type}s`);
        await invalidateCache("stats");
        await invalidateCache(slug);
      }
    } catch (error) {
      toast.error(
        `Failed to ${
          status === "archived" ? "unarchive" : "archive"
        } ${type}. Reason: ${(error as any)?.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={`/dashboard/${type}s/${slug}?isEditMode=true`}
            className="w-full"
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="disabled:opacity-60 w-full px-2" asChild>
          <AlertDialog>
            <AlertDialogTrigger className="w-full px-2 py-1.5 text-left cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your {type} and remove your {type} data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger className="w-full px-2 py-1.5 text-left cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
              {status === "active" ? "Archive" : "Unarchive"}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will archive your {type} and remove your {type} data from
                  public landing page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={isLoading} onClick={handleArchive}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;

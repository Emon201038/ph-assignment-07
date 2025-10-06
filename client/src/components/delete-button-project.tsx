"use client";
import React, { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import { invalidateCache } from "@/actions";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const DeleteButtonProject = ({ slug }: { slug: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${serverUrl}/api/v1/project/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error("Failed to delete project. Reason: " + data?.message);
      } else {
        toast.success("Project deleted successfull");
        await invalidateCache("projects");
      }
    } catch (error) {
      toast.error(
        "Failed to delete project. Reason: " + (error as any)?.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DropdownMenuItem
      disabled={isLoading}
      onClick={handleDelete}
      className="disabled:opacity-60"
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteButtonProject;

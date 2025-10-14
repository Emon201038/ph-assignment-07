import React from "react";
import BlogDetailPage from "./blog-details";
import { getBlogBySlug } from "@/lib/fetch-data";
import { notFound } from "next/navigation";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getBlogBySlug(slug, {
    next: { tags: [slug] },
  });

  if (!res.data) return notFound();
  return <BlogDetailPage post={res.data} />;
};

export default SingleBlogPage;

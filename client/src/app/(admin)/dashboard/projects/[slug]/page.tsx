import { getProjectBySlug } from "@/lib/fetch-data";
import { notFound } from "next/navigation";
import React from "react";
import ProjectDetailPage from "./project-form";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getProjectBySlug(slug, {
    next: { tags: [slug] },
  });

  const project = res.data;
  if (!project) {
    return notFound();
  }
  return <ProjectDetailPage project={project} />;
};

export default ProjectPage;

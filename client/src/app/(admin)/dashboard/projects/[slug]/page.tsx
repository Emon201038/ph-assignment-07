import { getProjectBySlug } from "@/lib/fetch-data";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ProjectDetailPage from "./project-form";
import { auth } from "@/auth";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const session = await auth();
  if (!session?.token) {
    redirect("/login?redirect=/dashboard/projects");
  }
  const res = await getProjectBySlug(slug, {
    next: { tags: [slug] },
    headers: {
      authorization: session.token,
    },
  });

  const project = res.data;
  if (!project) {
    return notFound();
  }
  return <ProjectDetailPage project={project} />;
};

export default ProjectPage;

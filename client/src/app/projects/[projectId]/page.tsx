import { ProjectDetails } from "@/components/project-details";
import { projectsData } from "@/lib/projects-data";
import { IProject } from "@/types";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  let project: IProject | undefined;

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background mt-12">
      <ProjectDetails project={project} />
    </main>
  );
}

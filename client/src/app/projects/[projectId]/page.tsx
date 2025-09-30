import { ProjectDetails } from "@/components/project-details";
import { projectsData } from "@/lib/projects-data";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = projectsData.find((p) => p.id == Number(projectId));

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <ProjectDetails project={project} />
    </main>
  );
}

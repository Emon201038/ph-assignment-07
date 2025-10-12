import { ProjectDetails } from "@/components/project-details";
import { getProjectBySlug } from "@/lib/fetch-data";
import { IProject } from "@/types";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const res = await getProjectBySlug(slug, {
    next: { tags: [slug] },
  });
  return {
    title: res.data.title,
    description: res.data.description,
    keywords: res.data.details.techStack.join(", "),
    openGraph: {
      title: res.data.title,
      description: res.data.description,
      images: [res.data.details.image.url],
    },
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const res = await getProjectBySlug(slug, {
    next: { tags: [slug] },
  });

  if (!res.data) {
    notFound();
  }

  console.log(res);
  return (
    <main className="min-h-screen bg-background mt-12">
      <ProjectDetails project={res.data} />
    </main>
  );
}

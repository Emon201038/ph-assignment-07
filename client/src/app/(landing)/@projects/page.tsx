import Projects from "@/components/Projects";
import { getProjects } from "@/lib/fetch-data";
import React from "react";

const ProjectsPage = async () => {
  const res = await getProjects(
    {
      page: "1",
      limit: "3",
      featured: "true",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      next: { tags: ["projects"] },
    }
  );

  return <Projects projects={res.data.projects || []} />;
};

export default ProjectsPage;

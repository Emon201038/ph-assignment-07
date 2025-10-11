import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/fetch-data";
import Image from "next/image";

export default async function ProjectsPage() {
  const res = await getProjects(
    {
      page: "1",
      limit: "100",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      next: { tags: ["projects"] },
    }
  );
  const projects = res.data.projects || [];

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of my work showcasing various technologies and
            solutions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.details.image.url || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {project.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">{project.details.role}</p>
                  <p>
                    {new Date(
                      project.details.duration.start
                    ).toLocaleDateString("en-US")}{" "}
                    -{" "}
                    {new Date(project.details.duration.end).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 bg-transparent"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 bg-transparent"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

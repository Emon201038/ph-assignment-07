import { ExternalLink, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";
import MoreButton from "@/components/more-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RecentProjects() {
  const session = await auth();
  if (!session?.token) {
    redirect("/login?redirect=/dashboard");
  }
  const res = await getProjects(
    {
      page: "1",
      limit: "6",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      headers: {
        authorization: session.token,
      },
    }
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription className="mt-1">
              Your latest work and updates
            </CardDescription>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {res.data.projects.map((project) => (
          <div
            key={project._id}
            className="group flex flex-col gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:shadow-sm sm:flex-row"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted sm:w-48">
              <Image
                src={project.details.image.url || "/placeholder.svg"}
                alt={project.title}
                fill
                className="h-full w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-balance">
                      {project.title}
                    </h3>
                    <div
                      className="mt-1 text-sm text-muted-foreground text-pretty line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></div>
                  </div>
                  <MoreButton
                    type="project"
                    slug={project.slug}
                    status={project.details.status}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.details.techStack.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {"2.3k"}
                  </span>
                  <Badge
                    variant={
                      project.details.status === "active"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {project.details.status}
                  </Badge>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-2"
                >
                  <Button variant="ghost" size="sm" className="gap-2">
                    View
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

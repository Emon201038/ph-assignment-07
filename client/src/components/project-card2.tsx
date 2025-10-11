import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { IProject } from "@/types";

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, details, slug, live: link } = project;
  const { techStack, image } = details;
  return (
    <div>
      <div className="grid md:grid-cols-5 gap-6 md:gap-8">
        <div className="md:col-span-2 relative aspect-video md:aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            {/* <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" /> */}
          </div>

          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {project.github && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-transparent"
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
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
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button variant="default" size="sm" asChild className="flex-1">
          <Link href={`/projects/${slug}`}>
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

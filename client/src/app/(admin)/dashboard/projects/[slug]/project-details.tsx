import { invalidateCache } from "@/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProject } from "@/types";
import { ArrowLeft, Edit, ExternalLink, Github, Zap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const ProjectDetails = ({ project }: { project: IProject }) => {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/projects/${project.slug}?isEditMode=true`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {project.title}
              </h1>
              {project.featured && <Badge>Featured</Badge>}
            </div>
            <div
              className="text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: project.description }}
            >
              {/* {project.description} */}
            </div>
          </div>

          <img
            src={project.details.image.url || "/placeholder.svg"}
            alt={project.title}
            className="w-full rounded-lg object-cover"
          />

          <div className="flex flex-wrap gap-2">
            {(project.details.tags || []).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {project.description && (
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
              </CardContent>
            </Card>
          )}

          {/* Features Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                Key Features
              </CardTitle>
              <CardDescription>
                Explore the main capabilities and functionalities of this
                project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {project.details.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            {project.live && (
              <Button asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

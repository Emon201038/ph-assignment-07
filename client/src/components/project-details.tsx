"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IProject } from "@/types";
import { ExternalLink, Github, Calendar, User, Code, Zap } from "lucide-react";
import Image from "next/image";

export function ProjectDetails({ project }: { project: IProject }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-balance">
            {project.title}
          </h1>
          {project.featured && (
            <Badge variant="secondary" className="ml-2">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {project.github.map((stack) => (
            <div
              key={stack.name}
              onClick={() => window.open(stack.url, "_blank")}
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Github size={20} />
              <p> {stack.name}</p>
            </div>
          ))}
          {project.live !== "#" && (
            <div
              onClick={() => window.open(project.live, "_blank")}
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200 flex justify-center items-center gap-2 cursor-pointer"
            >
              <ExternalLink size={20} />
              <p>Live Link</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Project Image */}
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Duration:</span>
                <span className="text-muted-foreground">
                  {project.details.duration}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Role:</span>
                <span className="text-muted-foreground">
                  {project.details.role}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-secondary" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.details.techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            Key Features
          </CardTitle>
          <CardDescription>
            Explore the main capabilities and functionalities of this project
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

      {/* Tags Section */}
      <Card>
        <CardHeader>
          <CardTitle>Technologies Used</CardTitle>
          <CardDescription>
            All the tools and frameworks that powered this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-secondary/10 text-secondary hover:bg-secondary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-16 text-center">
        <Separator className="mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {project.github.map((stack) => (
            <div
              key={stack.name}
              onClick={() => window.open(stack.url, "_blank")}
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Github size={20} />
              <p> {stack.name}</p>
            </div>
          ))}
          {project.live !== "#" && (
            <div
              onClick={() => window.open(project.live, "_blank")}
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200 flex justify-center items-center gap-2 cursor-pointer"
            >
              <ExternalLink size={20} />
              <p>Live Link</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

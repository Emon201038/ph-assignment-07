import { ExternalLink, MoreVertical, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with Next.js",
    status: "active",
    views: "2.4k",
    image: "/ecommerce-website-mockup.png",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 2,
    title: "Design System",
    description: "Component library for enterprise applications",
    status: "active",
    views: "1.8k",
    image: "/design-system-components.png",
    tags: ["React", "Storybook", "Tailwind"],
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform",
    status: "draft",
    views: "892",
    image: "/analytics-dashboard-charts.png",
    tags: ["React", "D3.js", "Node.js"],
  },
]

export function RecentProjects() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription className="mt-1">Your latest work and updates</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:shadow-sm sm:flex-row"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted sm:w-48">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-balance">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground text-pretty">{project.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
                    {project.views}
                  </span>
                  <Badge variant={project.status === "active" ? "default" : "secondary"} className="capitalize">
                    {project.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  View
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

import { Calendar, Clock, MoreVertical, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn best practices for structuring large-scale React applications with modern tooling.",
    category: "Development",
    date: "2024-03-15",
    readTime: "8 min read",
    views: "3.2k",
    status: "published",
  },
  {
    id: 2,
    title: "The Future of Web Design",
    excerpt: "Exploring emerging trends in web design and how they'll shape the digital landscape.",
    category: "Design",
    date: "2024-03-10",
    readTime: "6 min read",
    views: "2.1k",
    status: "published",
  },
  {
    id: 3,
    title: "TypeScript Tips and Tricks",
    excerpt: "Advanced TypeScript patterns that will make your code more maintainable and type-safe.",
    category: "Tutorial",
    date: "2024-03-05",
    readTime: "10 min read",
    views: "1.8k",
    status: "draft",
  },
]

export function BlogPosts() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription className="mt-1">Your published articles and drafts</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="group rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs capitalize">
                    {post.status}
                  </Badge>
                </div>

                <h3 className="font-semibold text-balance mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {post.views} views
                  </span>
                </div>
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
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

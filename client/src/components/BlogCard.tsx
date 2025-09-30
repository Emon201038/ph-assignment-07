import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import type { IBlogPost } from "@/lib/blogs-data";
import Image from "next/image";

interface BlogCardProps {
  blog: IBlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.id}`} className="group block">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/20">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <Image
              width={500}
              height={500}
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-balance group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
            {blog.description}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

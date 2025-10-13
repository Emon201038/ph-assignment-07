import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getFeaturedBlogs() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      _id: 1,
      title: "Building Accessible Web Applications",
      slug: "building-accessible-web-applications",
      excerpt:
        "Learn the fundamentals of web accessibility and how to build inclusive applications that work for everyone.",
      image: { url: "/accessibility-web-design.png" },
      tags: ["Accessibility", "React", "Best Practices"],
      createdAt: "2024-01-15",
      readTime: 8,
    },
    {
      _id: 2,
      title: "Modern CSS Techniques for 2024",
      slug: "modern-css-techniques-2024",
      excerpt:
        "Explore the latest CSS features including container queries, cascade layers, and modern layout techniques.",
      image: { url: "/modern-css-design.jpg" },
      tags: ["CSS", "Web Design", "Frontend"],
      createdAt: "2024-01-10",
      readTime: 6,
    },
  ];
}

export default async function BlogsSlot() {
  const blogs = await getFeaturedBlogs();

  return (
    <section id="blog" className="px-6 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Featured Articles
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <BlogCard
              key={post._id}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.image.url}
              tags={post.tags}
              slug={post.slug}
              createdAt={post.createdAt}
              readTime={post.readTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

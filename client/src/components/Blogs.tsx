import React from "react";
import { Badge } from "./ui/badge";
import { blogsData } from "@/lib/blogs-data";
import { BlogCard } from "./BlogCard";

const Blogs = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold">All Blog Posts</h2>
        <Badge variant="outline">{blogsData.length}</Badge>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsData.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;

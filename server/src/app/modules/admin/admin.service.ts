import Blog from "../blog/blog.model";
import Project from "../project/project.model";

const getStats = async () => {
  const [
    totalProjects,
    totalBlogs,
    totalActiveProjects,
    totalPublishedBlogs,
    totalFeaturedBlogs,
    totalFeaturedProjects,
  ] = await Promise.all([
    Project.countDocuments({}),
    Blog.countDocuments({}),
    Project.countDocuments({ "details.status": "active" }),
    Blog.countDocuments({ published: true }),
    Blog.countDocuments({ published: true }),
    Project.countDocuments({ featured: true }),
  ]);

  return {
    totalProjects,
    totalBlogs,
    totalActiveProjects,
    totalPublishedBlogs,
    totalFeaturedProjects,
    totalFeaturedBlogs,
  };
};

export const AdminService = {
  getStats,
};

import { uploadFilesToCloudinary } from "../../utils/upload-files";
import { QueryBuilder } from "../../lib/queryBuilder";
import AppError from "../../helpers/appError";
import slugify from "slugify";
import Blog from "./blog.model";
import { CreateBlogSchemaType } from "./blog.validation";

const getAllBlogs = async (query: Record<string, string>) => {
  const builder = new QueryBuilder(Blog, query as Record<string, string>);
  const blogs = await builder
    .filter()
    .search(["title", "content", "tags"])
    .paginate()
    .execWithMeta();

  return { blogs: blogs.data, meta: blogs.meta };
};

const createBlog = async (
  blogData: CreateBlogSchemaType,
  file: Express.Multer.File,
  authorId: string
) => {
  const payload = {
    ...blogData,
    slug: "",
    tags: [""],
    author: authorId,
  };
  if (file) {
    const uploadedFile = await uploadFilesToCloudinary(file, "blogs");
    if (!uploadedFile) throw new AppError(500, "File upload failed");

    payload.image = {
      url: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.url
        : uploadedFile?.url,
      pub_id: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.pub_id
        : uploadedFile?.pub_id,
    };
  }

  payload.slug = slugify(blogData.title, {
    lower: true,
  });
  payload.tags = blogData.tags.split(",").map((tag) => tag.trim());

  const newBlog = await Blog.create(payload);
  if (!newBlog) throw new AppError(500, "Blog not created");

  return newBlog;
};

const getBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOne({ slug });
  if (!blog) throw new AppError(404, "No blog Found");

  return blog;
};

const updateBLog = async (
  slug: string,
  blogData: Partial<CreateBlogSchemaType>
) => {
  const existingBlog = await Blog.findOne({ slug });
  if (!existingBlog) throw new AppError(404, "No Project Found");

  existingBlog.title = blogData.title as string;
  existingBlog.content = blogData.content as string;
  existingBlog.featured = JSON.parse(blogData.featured as unknown as string);
  existingBlog.status = blogData.status as "active" | "draft" | "archived";
  existingBlog.excerpt = blogData.excerpt as string;
  existingBlog.readTime = Number(blogData.readTime);

  if (blogData?.tags) {
    existingBlog.tags = blogData.tags.split(",").map((tag) => tag.trim());
  }
  await existingBlog.save({ validateBeforeSave: true });
  return existingBlog;
};

const deleteBlog = async (slug: string) => {
  const blog = await Blog.findOneAndDelete({ slug });
  if (!blog) throw new AppError(404, "No Blog Found");

  return blog;
};

const archiveBlog = async (slug: string, archived: boolean) => {
  const blog = await Blog.findOne({ slug });
  if (!blog) throw new AppError(404, "No Blog Found");

  blog.status = archived ? "archived" : "active";
  await blog.save({ validateBeforeSave: true });
  return blog;
};

export const BlogService = {
  getAllBlogs,
  createBlog,
  getBlogBySlug,
  updateBLog,
  deleteBlog,
  archiveBlog,
};

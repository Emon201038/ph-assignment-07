import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import { CreateBlogSchemaType } from "./blog.validation";

const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query;

  sendResponse(res, {
    statusCode: 200,
    message: "Blogs retrieved successfully",
    data: await BlogService.getAllBlogs(query as Record<string, string>),
  });
});

const createBlog = catchAsync(async (req, res) => {
  const blogData = req.body as CreateBlogSchemaType;
  sendResponse(res, {
    statusCode: 201,
    message: "Blog created successfully",
    data: await BlogService.createBlog(
      blogData,
      req.file as Express.Multer.File
    ),
  });
});

const getBlogBySlug = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Blog found",
    data: await BlogService.getBlogBySlug(req.params.slug),
  });
});

const updateBlog = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Blog updated successfully",
    data: await BlogService.updateBLog(req.params.slug, req.body),
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Blog deleted successfully",
    data: await BlogService.deleteBlog(req.params.slug),
  });
});

const archiveBlog = catchAsync(async (req, res) => {
  const archived = JSON.parse(req.body.archived);
  sendResponse(res, {
    statusCode: 200,
    message: `Blog ${!archived ? "unarchived" : "archived"} successfully`,
    data: await BlogService.archiveBlog(req.params.slug, archived),
  });
});

export const BlogController = {
  getAllBlogs,
  createBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  archiveBlog,
};

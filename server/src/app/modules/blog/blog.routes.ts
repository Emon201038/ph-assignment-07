import express from "express";
import { BlogController } from "./blog.controller";
import { uploadImage } from "../../middlewares/uploadFile";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogSchema } from "./blog.validation";
import { checkAuth } from "../../middlewares/checkAuth";

const blogRouter = express.Router();

blogRouter
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(
    uploadImage.single("image"),
    validateRequest(createBlogSchema),
    checkAuth("ADMIN", "SUPER_ADMIN"),
    BlogController.createBlog
  );

blogRouter
  .route("/:slug")
  .get(BlogController.getBlogBySlug)
  .put(
    checkAuth("ADMIN", "SUPER_ADMIN"),
    validateRequest(createBlogSchema),
    BlogController.updateBlog
  )
  .delete(checkAuth("ADMIN", "SUPER_ADMIN"), BlogController.deleteBlog);

blogRouter.patch(
  "/:slug/archive",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  BlogController.archiveBlog
);

export default blogRouter;

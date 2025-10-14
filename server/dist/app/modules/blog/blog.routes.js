"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const uploadFile_1 = require("../../middlewares/uploadFile");
const validateRequest_1 = require("../../middlewares/validateRequest");
const blog_validation_1 = require("./blog.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const blogRouter = express_1.default.Router();
blogRouter
    .route("/")
    .get(blog_controller_1.BlogController.getAllBlogs)
    .post(uploadFile_1.uploadImage.single("image"), (0, validateRequest_1.validateRequest)(blog_validation_1.createBlogSchema), (0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), blog_controller_1.BlogController.createBlog);
blogRouter
    .route("/:slug")
    .get(blog_controller_1.BlogController.getBlogBySlug)
    .put((0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), (0, validateRequest_1.validateRequest)(blog_validation_1.createBlogSchema), blog_controller_1.BlogController.updateBlog)
    .delete((0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), blog_controller_1.BlogController.deleteBlog);
blogRouter.patch("/:slug/archive", (0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), blog_controller_1.BlogController.archiveBlog);
exports.default = blogRouter;

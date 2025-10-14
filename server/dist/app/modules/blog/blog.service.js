"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const upload_files_1 = require("../../utils/upload-files");
const queryBuilder_1 = require("../../lib/queryBuilder");
const appError_1 = __importDefault(require("../../helpers/appError"));
const slugify_1 = __importDefault(require("slugify"));
const blog_model_1 = __importDefault(require("./blog.model"));
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new queryBuilder_1.QueryBuilder(blog_model_1.default, query);
    const blogs = yield builder
        .filter()
        .search(["title", "content", "tags"])
        .paginate()
        .execWithMeta();
    return { blogs: blogs.data, meta: blogs.meta };
});
const createBlog = (blogData, file, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const payload = Object.assign(Object.assign({}, blogData), { slug: "", tags: [""], author: authorId });
    if (file) {
        const uploadedFile = yield (0, upload_files_1.uploadFilesToCloudinary)(file, "blogs");
        if (!uploadedFile)
            throw new appError_1.default(500, "File upload failed");
        payload.image = {
            url: Array.isArray(uploadedFile)
                ? (_a = uploadedFile[0]) === null || _a === void 0 ? void 0 : _a.url
                : uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.url,
            pub_id: Array.isArray(uploadedFile)
                ? (_b = uploadedFile[0]) === null || _b === void 0 ? void 0 : _b.pub_id
                : uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.pub_id,
        };
    }
    payload.slug = (0, slugify_1.default)(blogData.title, {
        lower: true,
    });
    payload.tags = blogData.tags.split(",").map((tag) => tag.trim());
    const newBlog = yield blog_model_1.default.create(payload);
    if (!newBlog)
        throw new appError_1.default(500, "Blog not created");
    return newBlog;
});
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOne({ slug });
    if (!blog)
        throw new appError_1.default(404, "No blog Found");
    return blog;
});
const updateBLog = (slug, blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield blog_model_1.default.findOne({ slug });
    if (!existingBlog)
        throw new appError_1.default(404, "No Project Found");
    existingBlog.title = blogData.title;
    existingBlog.content = blogData.content;
    existingBlog.featured = JSON.parse(blogData.featured);
    existingBlog.status = blogData.status;
    existingBlog.excerpt = blogData.excerpt;
    existingBlog.readTime = Number(blogData.readTime);
    if (blogData === null || blogData === void 0 ? void 0 : blogData.tags) {
        existingBlog.tags = blogData.tags.split(",").map((tag) => tag.trim());
    }
    yield existingBlog.save({ validateBeforeSave: true });
    return existingBlog;
});
const deleteBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOneAndDelete({ slug });
    if (!blog)
        throw new appError_1.default(404, "No Blog Found");
    return blog;
});
const archiveBlog = (slug, archived) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOne({ slug });
    if (!blog)
        throw new appError_1.default(404, "No Blog Found");
    blog.status = archived ? "archived" : "active";
    yield blog.save({ validateBeforeSave: true });
    return blog;
});
exports.BlogService = {
    getAllBlogs,
    createBlog,
    getBlogBySlug,
    updateBLog,
    deleteBlog,
    archiveBlog,
};

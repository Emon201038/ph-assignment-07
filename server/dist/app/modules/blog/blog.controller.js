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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
const getAllBlogs = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Blogs retrieved successfully",
        data: yield blog_service_1.BlogService.getAllBlogs(query),
    });
}));
const createBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = req.body;
    const author = req.user;
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Blog created successfully",
        data: yield blog_service_1.BlogService.createBlog(blogData, req.file, author === null || author === void 0 ? void 0 : author.id),
    });
}));
const getBlogBySlug = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Blog found",
        data: yield blog_service_1.BlogService.getBlogBySlug(req.params.slug),
    });
}));
const updateBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Blog updated successfully",
        data: yield blog_service_1.BlogService.updateBLog(req.params.slug, req.body),
    });
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Blog deleted successfully",
        data: yield blog_service_1.BlogService.deleteBlog(req.params.slug),
    });
}));
const archiveBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const archived = JSON.parse(req.body.archived);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: `Blog ${!archived ? "unarchived" : "archived"} successfully`,
        data: yield blog_service_1.BlogService.archiveBlog(req.params.slug, archived),
    });
}));
exports.BlogController = {
    getAllBlogs,
    createBlog,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    archiveBlog,
};

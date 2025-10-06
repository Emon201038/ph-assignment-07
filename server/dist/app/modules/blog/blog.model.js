"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        min: [2, "Title should minimum 2 charecter"]
    },
    slug: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        unique: true,
        min: [2, "Title should minimum 2 charecter"],
        set: function (v) {
            return (0, slugify_1.default)(v);
        }
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        min: [10, "Content should minimum 10 charecters long"]
    },
    tags: [String],
    category: String,
    coverImage: String,
    published: Boolean,
    likes: Number,
    views: Number,
    commentsCount: Number
}, {
    timestamps: true
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;

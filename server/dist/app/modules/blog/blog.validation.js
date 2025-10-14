"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(2, { error: "Title should be minimum 2 charecters" }),
    excerpt: zod_1.default
        .string()
        .min(2, { error: "execerpt should be minimum 2 charecters" }),
    image: zod_1.default
        .object({
        url: zod_1.default.string().url().optional(),
        pub_id: zod_1.default.string().optional(),
    })
        .optional(),
    content: zod_1.default
        .string()
        .min(2, { error: "Content should be minimum 2 charecters" }),
    tags: zod_1.default.string(),
    readTime: zod_1.default
        .string()
        .min(1, { error: "Read time should be minimum 1 charecters" }),
    status: zod_1.default.enum(["active", "draft", "archived"]).default("active"),
    featured: zod_1.default.boolean().default(false),
});

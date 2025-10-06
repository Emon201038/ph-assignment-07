"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, { error: "Title should be minimum 2 charecters" }),
    description: zod_1.z
        .string()
        .min(2, { error: "Description should be minimum 2 charecters" }),
    github: zod_1.z
        .string()
        .url()
        .min(2, { error: "Github url should be minimum 2 charecters" }),
    live: zod_1.z
        .string()
        .url()
        .min(2, { error: "Live url should be minimum 2 charecters" }),
    details: zod_1.z.object({
        duration: zod_1.z.object({
            start: zod_1.z.string().min(2, { error: "Start date is required" }),
            end: zod_1.z.string().min(2, { error: "End date is required" }),
        }),
        features: zod_1.z.string().min(1, { error: "At least one feature is required" }),
        role: zod_1.z.string().min(2, { error: "Role should be minimum 2 charecters" }),
        techStack: zod_1.z
            .string()
            .min(1, { error: "At least one tech stack is required" }),
        status: zod_1.z.enum(["active", "draft", "archived"]).default("active"),
        image: zod_1.z
            .object({
            url: zod_1.z.string().url().optional(),
            pub_id: zod_1.z.string().optional(),
        })
            .optional(),
    }),
    featured: zod_1.z.boolean().default(false),
});

import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { error: "Password should be minimum 6 charecters" }),
});

export const createProjectSchema = z.object({
  title: z.string().min(2, { error: "Title should be minimum 2 charecters" }),
  description: z
    .string()
    .min(2, { error: "Description should be minimum 2 charecters" }),
  image: z.instanceof(File, { error: "Image is required" }),
  github: z
    .string()
    .url()
    .min(2, { error: "Github url should be minimum 2 charecters" }),
  live: z
    .string()
    .url()
    .min(2, { error: "Live url should be minimum 2 charecters" }),
  details: z.object({
    duration: z.object({
      start: z.string().min(2, { error: "Start date is required" }),
      end: z.string().min(2, { error: "End date is required" }),
    }),
    features: z.string().min(1, { error: "At least one feature is required" }),
    role: z.string().min(2, { error: "Role should be minimum 2 charecters" }),
    techStack: z
      .string()
      .min(1, { error: "At least one tech stack is required" }),
    status: z.enum(["active", "draft", "archived"]).default("active"),
    tags: z.string().optional(),
  }),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.extend({
  image: z.instanceof(File).optional().or(z.string().optional()),
});

export const createBlogSchema = z.object({
  title: z.string().min(2, { error: "Title should be minimum 2 charecters" }),
  excerpt: z
    .string()
    .min(2, { error: "execerpt should be minimum 2 charecters" }),
  image: z.instanceof(File, { error: "Image is required" }),
  content: z
    .string()
    .min(2, { error: "Content should be minimum 2 charecters" }),
  tags: z.string().optional(),
  readTime: z
    .string()
    .min(2, { error: "Read time should be minimum 2 charecters" }),
  status: z.enum(["active", "draft", "archived"]).default("active"),
  featured: z.boolean().default(false),
});

export const updateBlogSchema = createBlogSchema.extend({
  image: z.instanceof(File).optional().or(z.string().optional()),
});

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchemaType = z.infer<typeof updateProjectSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type CreateBlogSchemaType = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchemaType = z.infer<typeof updateBlogSchema>;

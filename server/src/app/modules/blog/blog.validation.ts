import z from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(2, { error: "Title should be minimum 2 charecters" }),
  excerpt: z
    .string()
    .min(2, { error: "execerpt should be minimum 2 charecters" }),
  image: z
    .object({
      url: z.string().url().optional(),
      pub_id: z.string().optional(),
    })
    .optional(),
  content: z
    .string()
    .min(2, { error: "Content should be minimum 2 charecters" }),
  tags: z.string(),
  readTime: z
    .string()
    .min(2, { error: "Read time should be minimum 2 charecters" }),
  status: z.enum(["active", "draft", "archived"]).default("active"),
  featured: z.boolean().default(false),
});

export type CreateBlogSchemaType = z.infer<typeof createBlogSchema>;

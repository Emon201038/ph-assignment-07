import { z } from "zod";
export const createProjectSchema = z.object({
  title: z.string().min(2, { error: "Title should be minimum 2 charecters" }),
  description: z
    .string()
    .min(2, { error: "Description should be minimum 2 charecters" }),
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
    tags: z.string().optional(),
    features: z.string().min(1, { error: "At least one feature is required" }),
    role: z.string().min(2, { error: "Role should be minimum 2 charecters" }),
    techStack: z
      .string()
      .min(1, { error: "At least one tech stack is required" }),
    status: z.enum(["active", "draft", "archived"]).default("active"),
    image: z
      .object({
        url: z.string().url().optional(),
        pub_id: z.string().optional(),
      })
      .optional(),
  }),
  featured: z.boolean().default(false),
});

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;

import { z } from "zod";

export const updateArticleSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  content: z.string().min(10).max(1000).optional(),
  url: z.string().url().optional(),
});

export type updateArticleDto = z.infer<typeof updateArticleSchema>;

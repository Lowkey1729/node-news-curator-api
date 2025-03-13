import { z } from "zod";

export const fetchArticlesSchema = z.object({
  title: z.string().optional(),
  views: z.number().int().optional(),
  clicks: z.number().int().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
  created_at: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  direction: z.enum(["asc", "desc"]).optional(),
  sort_by: z.enum(["views", "title", "id", "clicks"]).optional(),
});

export type fetchArticlesDto = z.infer<typeof fetchArticlesSchema>;

import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters").max(1000, "Content cannot exceed 1000 characters"),
    url: z.string().url("Invalid URL format"),
});

export type createArticleDto = z.infer<typeof createArticleSchema>
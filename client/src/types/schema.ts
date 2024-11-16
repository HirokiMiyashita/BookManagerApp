import { z } from "zod";

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  coverImage?: string;
  genre?: string;
  publishedYear?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const insertBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  genre: z.string().optional(),
  publishedYear: z.number().min(1000).max(new Date().getFullYear()).optional(),
});

export type InsertBook = z.infer<typeof insertBookSchema>;

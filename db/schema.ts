import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  genre: text("genre"),
  publishedYear: integer("published_year"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBookSchema = createInsertSchema(books, {
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  genre: z.string().optional(),
  publishedYear: z.number().min(1000).max(new Date().getFullYear()).optional(),
});

export const selectBookSchema = createSelectSchema(books);
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = z.infer<typeof selectBookSchema>;

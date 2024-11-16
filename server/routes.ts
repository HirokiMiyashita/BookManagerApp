import type { Express } from "express";
import { db } from "../db";
import { books } from "../db/schema";
import { eq, like, desc } from "drizzle-orm";

export function registerRoutes(app: Express) {
  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const { search, sort } = req.query;
      let query = db.select().from(books);
      
      if (search) {
        query = query.where(
          like(books.title, `%${search}%`)
        );
      }
      
      if (sort === 'latest') {
        query = query.orderBy(desc(books.createdAt));
      }
      
      const result = await query;
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

  // Get single book
  app.get("/api/books/:id", async (req, res) => {
    try {
      const result = await db
        .select()
        .from(books)
        .where(eq(books.id, parseInt(req.params.id)));
      
      if (result.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  });

  // Create book
  app.post("/api/books", async (req, res) => {
    try {
      const result = await db.insert(books).values(req.body).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create book" });
    }
  });

  // Update book
  app.put("/api/books/:id", async (req, res) => {
    try {
      const result = await db
        .update(books)
        .set(req.body)
        .where(eq(books.id, parseInt(req.params.id)))
        .returning();
      
      if (result.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update book" });
    }
  });

  // Delete book
  app.delete("/api/books/:id", async (req, res) => {
    try {
      const result = await db
        .delete(books)
        .where(eq(books.id, parseInt(req.params.id)))
        .returning();
      
      if (result.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete book" });
    }
  });
}

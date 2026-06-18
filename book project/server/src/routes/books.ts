import { Router, Request, Response } from "express";
import Book from "../models/Book";

const router = Router();

// ===================
// GET ALL BOOKS
// ===================
router.get("/", async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ===================
// ADD A BOOK
// ===================
router.post("/", async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

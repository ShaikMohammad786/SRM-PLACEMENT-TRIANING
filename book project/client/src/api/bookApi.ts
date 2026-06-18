import type { Book } from "../types/Book";

const API_URL = "http://localhost:5000/api/books";

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export async function addBook(book: Omit<Book, "_id">): Promise<Book> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error("Failed to add book");
  }
  return response.json();
}

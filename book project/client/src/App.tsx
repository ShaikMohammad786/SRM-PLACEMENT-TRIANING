import { useState, useEffect } from "react";
import type { Book } from "./types/Book";
import { fetchBooks } from "./api/bookApi";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import "./index.css";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="app-wrapper">
      {/* Animated background orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>

      <div className="container">
        <header className="app-header">
          <div className="logo">📚</div>
          <h1>Library Manager</h1>
          <p className="subtitle">Manage your book collection with ease</p>
        </header>

        <section className="card form-card">
          <h2 className="card-title">
            <span className="card-icon">✏️</span> Add New Book
          </h2>
          <BookForm onBookAdded={loadBooks} />
        </section>

        <section className="card table-card">
          <BookTable books={books} loading={loading} />
        </section>
      </div>
    </div>
  );
}

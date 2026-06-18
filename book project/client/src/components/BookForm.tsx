import { useState, FormEvent } from "react";
import type { Book } from "../types/Book";

interface BookFormProps {
  onBookAdded: () => void;
}

export default function BookForm({ onBookAdded }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.author ||
      !formData.category ||
      !formData.price ||
      !formData.quantity
    ) {
      alert("Please fill all fields");
      return;
    }

    const book: Omit<Book, "_id"> = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!response.ok) throw new Error("Failed to add book");

      setSuccessMsg("Book added successfully!");
      setFormData({ title: "", author: "", category: "", price: "", quantity: "" });
      onBookAdded();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner"></span> Adding...
          </span>
        ) : (
          <>
            <span className="btn-icon">+</span> Add Book
          </>
        )}
      </button>

      {successMsg && <div className="success-toast">{successMsg}</div>}
    </form>
  );
}

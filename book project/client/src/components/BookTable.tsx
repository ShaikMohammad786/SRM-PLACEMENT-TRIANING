import type { Book } from "../types/Book";

interface BookTableProps {
  books: Book[];
  loading: boolean;
}

export default function BookTable({ books, loading }: BookTableProps) {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-pulse"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>No Books Yet</h3>
        <p>Add your first book using the form above</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-header-bar">
        <h2>📖 Book Collection</h2>
        <span className="book-count">{books.length} book{books.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="table-row-animate" style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="row-number">{index + 1}</td>
                <td className="book-title-cell">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className="category-badge">{book.category}</span>
                </td>
                <td className="price-cell">₹{book.price}</td>
                <td className="quantity-cell">{book.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

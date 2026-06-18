import express from "express";
import cors from "cors";
import "./db";
import bookRoutes from "./routes/books";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

app.get("/", (_req, res) => {
  res.send("📚 Library Server Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/libraryDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected to libraryDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

export default mongoose;

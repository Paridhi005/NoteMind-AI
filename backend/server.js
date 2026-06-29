require("dotenv").config();

console.log(
  "KEY:",
  process.env.GEMINI_API_KEY?.substring(0, 10)
);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const notebookRoutes = require("./routes/notebookRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

const chatRoutes = require("./routes/chatRoutes");

const summaryRoutes = require("./routes/summaryRoutes");

const quizRoutes = require("./routes/quizRoutes");

const flashcardRoutes = require("./routes/flashcardRoutes");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/summary", summaryRoutes);

app.use("/api/quiz", quizRoutes);

app.use("/api/flashcards", flashcardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("NoteMind AI Backend Running...");
});

app.use("/api/notebooks", notebookRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

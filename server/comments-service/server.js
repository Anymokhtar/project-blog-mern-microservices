import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import commentRoutes from "./routes/commentRoutes";
import { errorResponserHandler, invalidPathHandler } from "./middleware/errorHandler";

dotenv.config();
connectDB();
const app = express();

// Global unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Optionally, you can terminate the process:
  // process.exit(1);
});

// Security-related middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  })
);

// CORS
app.use(cors({
  origin: ['http://localhost:5002'],
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json({ limit: '1kb' }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/comments", commentRoutes);

// Permission to upload photo in front
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

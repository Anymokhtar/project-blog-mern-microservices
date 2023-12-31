import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { invalidPathHandler, errorResponserHandler } from "../shared/src/middleware/errorHandler";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";

dotenv.config();
connectDB();
const app = express();

// CORS
const corsOptions = {
  origin: ['http://localhost:5001'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Security Middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(limiter);

// Body parser
app.use(express.json({ limit: '1kb' }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, "../uploads")));

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Use postRoutes for handling "/api/posts" path
app.use("/api/posts", postRoutes);

// Handle invalid paths
app.use(invalidPathHandler);

// Handle errors
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorResponserHandler, invalidPathHandler } from "./middleware/errorHandler";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import postCategoriesRoutes from "./routes/postCategoriesRoutes";

dotenv.config();
const app = express();

// Connect to the database
try {
  await connectDB();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database:", error.message);
  process.exit(1);
}

// CORS
const corsOptions = {
  origin: ['http://localhost:5003'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(limiter);

// Body parser
app.use(express.json({ limit: '1kb' }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/post-categories", postCategoriesRoutes);

// Permission to upload photos in front
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

// Invalid path handler
app.use((req, res) => {
  res.status(404).send("Invalid path");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

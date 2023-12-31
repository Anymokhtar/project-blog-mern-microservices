import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import {
    errorResponserHandler,
    invalidPathHandler,
  } from "./middleware/errorHandler";
import cors from "cors";
// Routes 
import path from "path";
import postCategoriesRoutes from "./routes/postCategoriesRoutes";

dotenv.config();
connectDB();
const app = express();

// CORS
const corsOptions = {
  origin: ['http://localhost:5000'], 
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
// Security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use(limiter);

// body parser
app.use(express.json({ limit: '1kb' })); 


app.get("/", (req, res) => {
    res.send("Server is runing...");
})


app.use("/api/post-categories", postCategoriesRoutes);

//permission to upload photo in front
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
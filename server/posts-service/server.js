import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { invalidPathHandler, errorResponserHandler } from "../shared/src/middleware/errorHandler";
import cors from "cors";
// Routes 
import postRoutes from "./routes/postRoutes";
import path from "path";

dotenv.config();
connectDB();
const app = express();

// CORS
const corsOptions = {
  origin: ['http://localhost:5001'], 
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

app.use("/api/posts", postRoutes);

//permission to upload photo in front
app.use('../uploads', express.static(path.join(__dirname, "../uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


import express from "express";
//import {my_name} from './data'
//console.log(my_name)
//npm start
import dotenv from "dotenv";
import connectDB from "./config/db";
import {
    errorResponserHandler,
    invalidPathHandler,
  } from "./middleware/errorHandler";
import cors from "cors";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Routes 
import path from "path";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
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

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

//permission to upload photo in front
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
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

let corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));


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
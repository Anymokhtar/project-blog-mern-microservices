import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { invalidPathHandler, errorResponserHandler } from "../shared/src/middleware/errorHandler";
import cors from "cors";
// Routes 
import postRoutes from "./routes/postRoutes";
import path from "path";

let corsOptions = {
    origin: '*' ,// Sensitive
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };

dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json(corsOptions))


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


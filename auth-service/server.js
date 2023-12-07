import express from "express";
//import {my_name} from './data'
//console.log(my_name)
//npm start
import dotenv from "dotenv";
import connectDB from "./config/db";
import { invalidPathHandler, errorResponserHandler } from "./middleware/errorHandler";
import cors from "cors";
// Routes 
import userRoutes from "./routes/userRoutes";
import path from "path";


dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Server is runing...");
})

app.use("/api/users", userRoutes);

//permission to upload photo in frnt
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


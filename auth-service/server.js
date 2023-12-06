import express from "express";
//import {my_name} from './data'
//console.log(my_name)
//npm start
import dotenv from "dotenv";
import connectDB from "./config/db";
import { invalidPathHandler, errorResponserHandler } from "./middleware/errorHandler";

// Routes 
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDB();
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server is runing...");
})

app.use("/api/users", userRoutes);

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


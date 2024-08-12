import express from "express";
import cors from "cors";
// Import the dotenv to access the .env file
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//routes
import pageRoutes from "./router/pageRoutes.js"
import userRoutes from "./router/userRoutes.js"

// Get the Mongoose client
import connectDB from "../backend/config/db.js"

// Mount the config to fetch the environment variables for all the custom files.
dotenv.config();

const app = express();

// Get the Mongoose client connected
connectDB();

const port = process.env.PORT || 3300;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // This allows cookies to be sent and received
}));
app.use(cookieParser());

app.get("/", (req, res)=> {
    res.send({message: "Status Ok"});
});


app.use("/user", userRoutes);
app.use("/api", pageRoutes);

// Middleware for async route controller handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server Ready at ${port}`);
});
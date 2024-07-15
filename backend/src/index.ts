import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// routes
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";

import cookieParser from "cookie-parser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(cookieParser()); // to parse cookies from request
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist"))); //so that we can deploy the enitre application all at once instead of seperate backend and frontend

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Specify your frontend origin here form where request could be accepted (authorisation etc.)
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

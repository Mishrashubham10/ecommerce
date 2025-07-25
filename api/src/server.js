import express from 'express';
import cookieParse from 'cookie-parser';
import { connectDb } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

// ROUTES IMPORTS
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5500;
const app = express();

// MIDDLEWARES
app.use(cookieParse());
app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));

// ROUTES
app.use("/api/v1/auth", authRoutes)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
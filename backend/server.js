import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import orderRouter from "./routes/orders.route.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

config();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins for CORS. When credentials are used, the origin
// must be explicitly allowed (not '*'). This allows both local dev and production.
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://shop-ease-omega-steel.vercel.app",
  process.env.FRONTEND_URL, // Allow dynamic origin from env var
].filter(Boolean); // Remove any undefined values

app.use(cookieParser());
  
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(path.resolve(), "images")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(", ")}`);
});
import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import orderRouter from "./routes/orders.route.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());

const allowedOrigins = [
  "https://shop-ease-delta-amber.vercel.app",
  "https://shop-ease-main.vercel.app",
  "http://localhost:5173",

];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

console.log(`CORS allowed origins: ${allowedOrigins.join(", ")}`);

app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(path.resolve(), "images")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at http://localhost:${PORT}`);
});

import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import orderRouter from "./routes/orders.route.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = "http://localhost:5173";

app.use(helmet()); //Security
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json({ limit: "100mb" }));
app.use("/images", express.static(path.resolve("images")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at http://localhost:${PORT}`);
});

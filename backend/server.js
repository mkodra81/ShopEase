import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import orderRouter from "./routes/orders.route.js";
import cors from "cors";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

config();
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies, etc.)
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }, // Adjust the cookie settings as needed
  })
);

app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(path.resolve(), "images")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});

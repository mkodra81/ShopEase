import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import router from "./routes/products.route.js";
import cors from "cors"
import path from "path";

const app = express();

config();
const PORT = process.env.PORT;

app.use(express.json()); 
app.use(cors());
app.use("/images", express.static(path.join(path.resolve(), "images"))); 
app.use("/api/products", router);

app.listen(PORT, () => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});

import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controller/product.control.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/search", searchProduct)

export default router;

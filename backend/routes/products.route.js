import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.control.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

router.get("/", getProducts);

router.post("/", upload.single("image"), createProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;

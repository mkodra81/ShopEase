import Product from "../models/product.model.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in fetching products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error in updating product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(`Error in deleting product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchProduct = async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in searching products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Multer configuration (image upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "frontend/public/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPG, JPEG, PNG, and GIF are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
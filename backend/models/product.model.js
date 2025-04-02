import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
); //product requirements

const Product = mongoose.model("Product", productSchema); //create a product class

export default Product;

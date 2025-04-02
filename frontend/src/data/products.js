import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set, get) => ({
  products: [],

  fetchAllProducts: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      set({ products: res.data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      set({ products: [] }); // Reset products on error
    }
  },

  addNewProduct: async (newProduct) => {
    try {
      const res = await axios.post("http://localhost:5000/api/products", newProduct);
      console.log("New product added:", res.data.data);
      set((state) => ({ products: [...state.products, res.data.data] }));
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...res.data.data } : product
        )
      }));
      return res.data.data; // Return the updated product data
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
    }
  },

  // Get a product by ID
  getProductById: (_id) => {
    return get().products.find((product) => product._id === (_id));
  },

  // Get products by category
  getProductsByCategory: (category) => {
    const products = get().products;
    console.log("Products:", products);
    
    if (!category || category === "all") return products;
    if (category === "featured") return products.filter((product) => product.featured);
    
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  },
}));

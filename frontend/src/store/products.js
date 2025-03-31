import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  likedProducts: [],
  searchProducts: [],

  setProducts: (data) => set({ products: data }),
  setLikedProducts: (data) => set({ likedProducts: data }),
  setSearchProducts: (data) => set({ searchProducts: data }),

  addNewProduct: async (newProduct) => {
    try {
      const res = await axios.post("http://localhost:5000/api/products", newProduct);
      set((state) => ({ products: [...state.products, res.data.data] }));
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  },

  getProducts: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      set({ products: res.data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        likedProducts: state.likedProducts.filter((product) => product._id !== id),
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
        ),
        likedProducts: state.likedProducts.map((product) =>
          product._id === id ? { ...product, ...res.data.data } : product
        ),
      }));
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
    }
  },

  searchProductsAsync: async (query) => {
    if (query.length === 0) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
      set({ searchProducts: res.data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },
}));
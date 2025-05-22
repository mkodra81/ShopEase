import { create } from "zustand";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; 

const useOrderStore = create((set, get) => ({
  orders : [],

  fetchAllOrders: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`);
      set({ orders: res.data.data });
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      set({ orders: [] }); 
    }
  },

  updateOrderStatus: async (orderId, status, corrierId) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/orders/${orderId}`, { status, corrierId });
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, status: res.data.data.status } : order
        )
      }));
      return res
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  },

  deleteOrder: async (orderId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/orders/${orderId}`);
      set((state) => ({
        orders: state.orders.filter((order) => order._id !== orderId),
      }));
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  },

  updateOrderStatus: async (orderId, status, corrierId) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/orders/${orderId}`, { status, corrierId });
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, status: res.data.data.status } : order
        )
      }));
      return res
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  },

  getOrderById: async (orderId) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders/${orderId}`)
      const order = res.data
      return order
    } catch (error) {
      console.error("Error fetching orders by status:", error.message);
      return;
    }
  },

  getOrdersByStatus: async (status) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders/status/${status}`);
      return res.data;
    }
    catch (error) {
      console.error("Error fetching orders by status:", error.message);
      return [];
    }
  },

  getCorrierOrders: async (corrierId) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders/corrier/${corrierId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching corrier orders:", error.message);
      return [];
    }
  },

  getOrdersByUserEmail: async (userEmail) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders/user/${userEmail}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error.message);
      return [];
    }
  },
}));

export { useOrderStore };


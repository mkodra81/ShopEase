import { create } from "zustand";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"; 

const useUserStore = create((set) => ({
  users: [],

  fetchAllUsers: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users`);
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  fetchUserById: async (userId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
}));

export default useUserStore;
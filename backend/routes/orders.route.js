import express from "express";
import { createOrder, getOrderById, getUserOrders, getOrdersByStatus, updateOrderStatus, getCorrierOrders, fetchAllOrders, deleteOrder } from "../controller/order.controller.js";

const router = express.Router();

router.get("/", fetchAllOrders);
router.delete("/:orderId", deleteOrder);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.get("/user/:userEmail", getUserOrders);
router.get("/status/:status", getOrdersByStatus);
router.put("/:orderId", updateOrderStatus);
router.get("/corrier/:corrierId", getCorrierOrders); 

export default router;
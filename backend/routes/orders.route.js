import express from "express";
import { createOrder, getOrderById, getUserOrders, getOrdersByStatus, updateOrderStatus, getCorrierOrders } from "../controller/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.get("/user/:userId", getUserOrders);
router.get("/status/:status", getOrdersByStatus);
router.put("/", updateOrderStatus);
router.get("/corrier/:corrierId", getCorrierOrders); 

export default router;
import express from "express";
const router = express.Router();
import { createOrder, getAllOrders, updateOrderStatus, getTotalSales } from "../controllers/order.controller.js";

// POST route for creating an order
router.post("/create", createOrder);

// Route to get all orders
router.get("/", getAllOrders);

// Route to update order status
router.put("/:orderId/status", updateOrderStatus);

// Route to get total sales
router.get("/total-sales", getTotalSales);

export default router;

import express from "express";

import {
  createNewOrder,
  getMyOrders,
  getOrders,
  changeOrderStatus,
  simulatePayment,
  getUnavailableSlots,
} from "../controllers/order.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

// CLIENT

router.post("/", protect, createNewOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/slots/unavailable", protect, getUnavailableSlots);
router.put("/:id/payment", protect, simulatePayment);

// ADMIN

router.get("/", protect, adminOnly, getOrders);
router.put("/:id/status", protect, adminOnly, changeOrderStatus);

export default router;
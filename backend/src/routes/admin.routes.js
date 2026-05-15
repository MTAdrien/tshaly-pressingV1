import express from "express";

import {
  dashboardStats,
  recentOrders,
  topClients,
  fullDashboard,
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Routes admin du dashboard

router.get(
  "/stats",
  protect,
  adminOnly,
  dashboardStats
);

router.get(
  "/recent-orders",
  protect,
  adminOnly,
  recentOrders
);

router.get(
  "/top-clients",
  protect,
  adminOnly,
  topClients
);

router.get(
  "/dashboard",
  protect,
  adminOnly,
  fullDashboard
);

export default router;
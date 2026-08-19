import express from "express";

import {
  getProfile,
  updateProfile,
  getUsers,
  removeUser,
} from "../controllers/user.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/", protect, adminOnly, getUsers);

router.delete("/:id", protect, adminOnly, removeUser);

export default router;

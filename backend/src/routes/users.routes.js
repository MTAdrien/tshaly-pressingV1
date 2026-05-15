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

// Routes profil utilisateur

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

// Routes admin
router.get("/", protect, adminOnly, getUsers);

router.delete("/:id", protect, adminOnly, removeUser);

export default router;
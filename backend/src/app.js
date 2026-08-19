import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "API Tshaly Pressing opérationnelle",
  });
});

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

import userRoutes from "./routes/users.routes.js";
app.use("/api/users", userRoutes);

import orderRoutes from "./routes/orders.routes.js";
app.use("/api/orders", orderRoutes);

import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

export default app;

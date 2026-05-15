import pool from "../config/db.js";

// CREATION COMMANDE

export const createOrder = async (userId, pickup_date, delivery_date) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, pickup_date, delivery_date)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, pickup_date, delivery_date]
  );

  return result.rows[0];
};

// AJOUTER ITEM COMMANDE (PANIER)

export const addOrderItem = async (orderId, item) => {
  const { service_name, quantity, price } = item;

  const result = await pool.query(
    `INSERT INTO order_items (order_id, service_name, quantity, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [orderId, service_name, quantity, price]
  );

  return result.rows[0];
};

// GET ORDERS USER

export const getUserOrders = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

// GET ALL ORDERS (ADMIN)

export const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT * FROM orders ORDER BY created_at DESC`
  );

  return result.rows;
};

// UPDATE STATUS

export const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, orderId]
  );

  return result.rows[0];
};

// UPDATE TOTAL PRICE COMMANDE

export const updateOrderTotal = async (orderId, totalPrice) => {
  const result = await pool.query(
    `UPDATE orders
     SET total_price = $1
     WHERE id = $2
     RETURNING *`,
    [totalPrice, orderId]
  );

  return result.rows[0];
};
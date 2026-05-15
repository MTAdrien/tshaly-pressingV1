import pool from "../config/db.js";

// Stats globales du dashboard

export const getDashboardStats = async () => {

  // total commandes
  const totalOrdersResult = await pool.query(
    `SELECT COUNT(*) FROM orders`
  );

  // revenus totaux
  const revenueResult = await pool.query(
    `SELECT COALESCE(SUM(total_price), 0) FROM orders`
  );

  // commandes aujourd'hui
  const todayOrdersResult = await pool.query(
    `SELECT COUNT(*)
     FROM orders
     WHERE DATE(created_at) = CURRENT_DATE`
  );

  // commandes en attente
  const pendingOrdersResult = await pool.query(
    `SELECT COUNT(*)
     FROM orders
     WHERE status = 'en_attente'`
  );

  // commandes livrées
  const deliveredOrdersResult = await pool.query(
    `SELECT COUNT(*)
     FROM orders
     WHERE status = 'livre'`
  );

  // total clients
  const totalClientsResult = await pool.query(
  `SELECT COUNT(*) FROM users WHERE role = 'client'`
);

  return {
    totalOrders: Number(totalOrdersResult.rows[0].count),
    totalRevenue: Number(revenueResult.rows[0].coalesce),
    todayOrders: Number(todayOrdersResult.rows[0].count),
    pendingOrders: Number(pendingOrdersResult.rows[0].count),
    deliveredOrders: Number(deliveredOrdersResult.rows[0].count),
    totalClients: Number(totalClientsResult.rows[0].count),
  };
};

// Commandes récentes

export const getRecentOrders = async () => {
  const result = await pool.query(
    `
    SELECT
      orders.id,
      orders.status,
      orders.total_price,
      orders.created_at,
      users.firstname,
      users.lastname
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
    LIMIT 10
    `
  );

  return result.rows;
};

// Top clients

export const getTopClients = async () => {
  const result = await pool.query(
    `
    SELECT
      users.id,
      users.firstname,
      users.lastname,
      users.email,
      COUNT(orders.id) AS total_orders,
      COALESCE(SUM(orders.total_price), 0) AS total_spent
    FROM users
    LEFT JOIN orders
      ON users.id = orders.user_id
    GROUP BY users.id
    ORDER BY total_spent DESC
    LIMIT 5
    `
  );

  return result.rows;
};
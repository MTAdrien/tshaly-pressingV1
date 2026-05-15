import {
  getDashboardStats,
  getRecentOrders,
  getTopClients,
} from "../services/admin.service.js";

// Stats globales du dashboard

export const dashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json(stats);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

// Commandes récentes

export const recentOrders = async (req, res) => {
  try {
    const orders = await getRecentOrders();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

// Top clients

export const topClients = async (req, res) => {
  try {
    const clients = await getTopClients();

    res.status(200).json(clients);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

// Dashboard complet

export const fullDashboard = async (req, res) => {
  try {

    const stats = await getDashboardStats();
    const recent = await getRecentOrders();
    const clients = await getTopClients();

    res.status(200).json({
      stats,
      recentOrders: recent,
      topClients: clients,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};
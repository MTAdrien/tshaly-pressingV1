import {
  createOrder,
  addOrderItem,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderTotal,
} from "../services/order.service.js";

// CREATION COMMANDE

export const createNewOrder = async (req, res) => {
  try {
    const { pickup_date, delivery_date, items } = req.body;

    // calcul du total de la commande
    let totalPrice = 0;

    for (const item of items) {
      totalPrice += Number(item.quantity) * Number(item.price);
    }

    // 1. créer commande
    const order = await createOrder(
      req.user.id,
      pickup_date,
      delivery_date
    );

    // 2. ajouter items panier
    for (const item of items) {
      await addOrderItem(order.id, item);
    }

    // 3. mettre à jour total commande
    const updatedOrder = await updateOrderTotal(
      order.id,
      totalPrice
    );


    res.status(201).json({
      message: "Commande créée",
      order: updatedOrder,
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// COMMANDES UTILISATEUR

export const getMyOrders = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.id);

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// TOUTES LES COMMANDES (ADMIN)

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// UPDATE STATUT COMMANDE (ADMIN)

export const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatus(req.params.id, status);

    res.status(200).json({
      message: "Statut mis à jour",
      order: order,
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
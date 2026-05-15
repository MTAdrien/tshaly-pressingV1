import {
  createOrder,
  addOrderItem,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderTotal,
  updatePaymentStatus,
  countOrdersBySlotAndDate,
  getFullSlotsByDate,
} from "../services/order.service.js";

// CREATION COMMANDE

export const createNewOrder = async (req, res) => {
  try {
    const { pickup_date, delivery_date, slot, items } = req.body;

    if (!pickup_date || !delivery_date) {
      return res.status(400).json({
        message: "Les dates de collecte et de livraison sont obligatoires",
      });
    }

    if (!slot) {
      return res.status(400).json({
        message: "Le créneau de collecte est obligatoire",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Le panier ne peut pas être vide",
      });
    }

    const MAX_ORDERS_PER_SLOT = 3;

    const existingOrdersForSlot = await countOrdersBySlotAndDate(
      pickup_date,
      slot
    );

    if (existingOrdersForSlot >= MAX_ORDERS_PER_SLOT) {
      return res.status(400).json({
        message: "Ce créneau est complet, veuillez en choisir un autre",
      });
    }

    let totalPrice = 0;

    for (const item of items) {
      if (!item.service_name || !item.quantity || !item.price) {
        return res.status(400).json({
          message: "Chaque article doit contenir un service, une quantité et un prix",
        });
      }

      const quantity = Number(item.quantity);
      const price = Number(item.price);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          message: "La quantité doit être un nombre entier supérieur à 0",
        });
      }

      if (Number.isNaN(price) || price <= 0) {
        return res.status(400).json({
          message: "Le prix doit être un nombre supérieur à 0",
        });
      }

      totalPrice += quantity * price;
    }

    const order = await createOrder(
      req.user.id,
      pickup_date,
      delivery_date,
      slot
    );

    for (const item of items) {
      await addOrderItem(order.id, {
        service_name: item.service_name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      });
    }

    const updatedOrder = await updateOrderTotal(
      order.id,
      totalPrice
    );

    res.status(201).json({
      message: "Commande créée",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
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

// CRENEAUX COMPLETS PAR DATE

export const getUnavailableSlots = async (req, res) => {
  try {
    const { pickup_date } = req.query;

    if (!pickup_date) {
      return res.status(400).json({
        message: "La date de collecte est obligatoire",
      });
    }

    const MAX_ORDERS_PER_SLOT = 3;

    const fullSlots = await getFullSlotsByDate(
      pickup_date,
      MAX_ORDERS_PER_SLOT
    );

    res.status(200).json(fullSlots);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
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

    const allowedStatuses = [
      "en_attente",
      "collecte",
      "en_traitement",
      "pret",
      "livre",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Statut invalide",
      });
    }

    const order = await updateOrderStatus(req.params.id, status);

    if (!order) {
      return res.status(404).json({
        message: "Commande introuvable",
      });
    }

    res.status(200).json({
      message: "Statut mis à jour",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

// SIMULATION PAIEMENT COMMANDE

export const simulatePayment = async (req, res) => {
  try {
    const { payment_status } = req.body;

    const allowedPaymentStatuses = [
      "pending",
      "paid",
      "failed",
    ];

    if (!allowedPaymentStatuses.includes(payment_status)) {
      return res.status(400).json({
        message: "Statut de paiement invalide",
      });
    }

    const order = await updatePaymentStatus(
      req.params.id,
      payment_status
    );

    if (!order) {
      return res.status(404).json({
        message: "Commande introuvable",
      });
    }

    res.status(200).json({
      message: "Paiement simulé mis à jour",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};
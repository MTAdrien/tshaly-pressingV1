// ==========================================================================
// DOM ELEMENTS
// ==========================================================================

const checkoutButton = document.querySelector(".checkout-btn");
const slots = document.querySelectorAll(".slot");
const pickupDateInput = document.getElementById("pickup-date");
const deliveryDateInput = document.getElementById("delivery-date");

// ==========================================================================
// ETAT DE LA SÉLECTION DES CRÉNEAUX
// ==========================================================================

let selectedSlot = null;

// ========================================================================
// CRÉNEAUX DE COLLECTE
// ========================================================================
//
// L'utilisateur ne peut sélectionner qu'un seul créneau.
// Si complet, il est désactivé et ne peut plus être choisi.
// --------------------------------------------------------------------------

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (slot.disabled) {
      showToast("Ce créneau est complet.", "error");
      return;
    }

    slots.forEach((s) => s.classList.remove("active"));

    slot.classList.add("active");

    selectedSlot = slot.dataset.value || slot.textContent.trim();
  });
});


// ==========================================================================
// LOAD UNAVAILABLE SLOTS
// ==========================================================================
// Le frontend demande au backend quels créneaux sont complets.
// --------------------------------------------------------------------------


async function loadUnavailableSlots() {
  const pickupDate = pickupDateInput.value;

  selectedSlot = null;

  resetSlots();

  if (!pickupDate) return;

  try {
    const unavailableSlots = await apiRequest(
      `/orders/slots/unavailable?pickup_date=${pickupDate}`
    );

    disableUnavailableSlots(unavailableSlots);
  } catch (error) {
    showToast(error.message, "error");
  }
}

// ==========================================================================
// REINITIALISATION DES CRÉNEAUX
// ==========================================================================
// Réinitialise l'état des créneaux avant de charger les créneaux complets.
// --------------------------------------------------------------------------

function resetSlots() {
  slots.forEach((slot) => {
    if (!slot.dataset.value) {
      slot.dataset.value = slot.textContent.trim().replace(" - Complet", "");
    }

    slot.disabled = false;
    slot.classList.remove("active");
    slot.classList.remove("disabled");
    slot.textContent = slot.dataset.value;
  });
}

// ==========================================================================
// DESACTIVATION DES CRÉNEAUX INDISPONIBLES
// ==========================================================================

function disableUnavailableSlots(unavailableSlots) {
  slots.forEach((slot) => {
    const slotValue = slot.dataset.value;

    if (unavailableSlots.includes(slotValue)) {
      slot.disabled = true;
      slot.classList.add("disabled");
      slot.textContent = `${slotValue} - Complet`;
    }
  });
}

// ==========================================================================
// CHANGEMENT DE DATE DE COLLECTE
// ==========================================================================

if (pickupDateInput) {
  pickupDateInput.addEventListener("change", loadUnavailableSlots);
}

// ==========================================================================
// CHECKOUT
// ==========================================================================

if (checkoutButton) {
  checkoutButton.addEventListener("click", async () => {
    const currentUser = getCurrentUser();

    if (!currentUser || !isAuthenticated()) {
      showToast("Vous devez être connecté pour réserver.", "error");

      setTimeout(() => {
        window.location.href = "connexion.html";
      }, 800);

      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const pickupDate = pickupDateInput.value;
    const deliveryDate = deliveryDateInput.value;

    if (!validateCheckout(cart, pickupDate, deliveryDate)) {
      return;
    }

    try {
      setLoading(checkoutButton, true);

      const orderResponse = await createOrder(
        pickupDate,
        deliveryDate,
        selectedSlot,
        cart
      );

      await simulatePayment(orderResponse.order.id);

      localStorage.removeItem("cart");

      showToast("Réservation et paiement confirmés avec succès.", "success");

      setTimeout(() => {
        window.location.href = "mon-compte.html";
      }, 800);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(checkoutButton, false);
    }
  });
}

// ==========================================================================
// VALIDATION DU CHECKOUT
// ==========================================================================

function validateCheckout(cart, pickupDate, deliveryDate) {
  if (cart.length === 0) {
    showToast("Votre panier est vide.", "error");
    return false;
  }

  if (!pickupDate) {
    showToast("Veuillez sélectionner la date de prise en charge.", "error");
    return false;
  }

  if (!deliveryDate) {
    showToast("Veuillez sélectionner la date de livraison.", "error");
    return false;
  }

  if (!selectedSlot) {
    showToast("Veuillez sélectionner un créneau.", "error");
    return false;
  }

  return true;
}

// ==========================================================================
// CRÉATION DE LA COMMANDE
// ==========================================================================
// Envoie une requête API pour créer une nouvelle commande avec les informations fournies.
// --------------------------------------------------------------------------

async function createOrder(pickupDate, deliveryDate, slot, cart) {
  return await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify({
      pickup_date: pickupDate,
      delivery_date: deliveryDate,
      slot,
      items: cart,
    }),
  });
}

// ==========================================================================
// SIMULATION DE PAIEMENT
// ==========================================================================

async function simulatePayment(orderId) {
  return await apiRequest(`/orders/${orderId}/payment`, {
    method: "PUT",
    body: JSON.stringify({
      payment_status: "paid",
    }),
  });
}

// ==========================================================================
// ETAT DE CHARGEMENT DU CHECKOUT
// ==========================================================================

function setLoading(button, isLoading) {
  const text = button.querySelector(".btn-text");
  const loader = button.querySelector(".btn-loader");

  if (isLoading) {
    text.textContent = "Traitement...";
    loader.classList.remove("hidden");
    button.disabled = true;
  } else {
    text.textContent = "Valider ma réservation";
    loader.classList.add("hidden");
    button.disabled = false;
  }
}
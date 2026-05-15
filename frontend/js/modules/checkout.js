/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const checkoutButton = document.querySelector(".checkout-btn");
const slots = document.querySelectorAll(".slot");
const pickupDateInput = document.getElementById("pickup-date");

let selectedSlot = null;

/*
|--------------------------------------------------------------------------
| SLOT SELECTION
|--------------------------------------------------------------------------
*/

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (slot.disabled) {
      showToast("Ce créneau est complet.", "error");
      return;
    }

    slots.forEach((s) => s.classList.remove("active"));

    slot.classList.add("active");

    selectedSlot = slot.textContent.trim();
  });
});

/*
|--------------------------------------------------------------------------
| UNAVAILABLE SLOTS
|--------------------------------------------------------------------------
*/

async function loadUnavailableSlots() {
  const pickupDate = pickupDateInput.value;

  selectedSlot = null;

  slots.forEach((slot) => {
  if (!slot.dataset.value) {
    slot.dataset.value = slot.textContent.trim().replace(" - Complet", "");
  }

  slot.disabled = false;
  slot.classList.remove("active");
  slot.classList.remove("disabled");
  slot.textContent = slot.dataset.value;
});

if (!pickupDate) {
  return;
}

try {
  const unavailableSlots = await apiRequest(
    `/orders/slots/unavailable?pickup_date=${pickupDate}`
  );

  slots.forEach((slot) => {
    const slotValue = slot.textContent.trim();

    if (unavailableSlots.includes(slotValue)) {
      slot.disabled = true;
      slot.classList.add("disabled");
      slot.textContent = `${slotValue} - Complet`;
    }
  });
} catch (error) {
  showToast(error.message, "error");
}
}

if (pickupDateInput) {
  pickupDateInput.addEventListener("change", loadUnavailableSlots);
}

/*
|--------------------------------------------------------------------------
| CHECKOUT BACKEND
|--------------------------------------------------------------------------
*/

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

    const pickupDate = document.getElementById("pickup-date").value;
    const deliveryDate = document.getElementById("delivery-date").value;

    if (cart.length === 0) {
      showToast("Votre panier est vide.", "error");
      return;
    }

    if (!pickupDate) {
      showToast("Veuillez sélectionner la date de prise en charge.", "error");
      return;
    }

    if (!deliveryDate) {
      showToast("Veuillez sélectionner la date de livraison.", "error");
      return;
    }

    if (!selectedSlot) {
      showToast("Veuillez sélectionner un créneau.", "error");
      return;
    }

    try {
      setLoading(checkoutButton, true);

      const orderResponse = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          pickup_date: pickupDate,
          delivery_date: deliveryDate,
          slot: selectedSlot,
          items: cart,
        }),
      });

      // ======================================================================
      // SIMULATE PAYMENT SUCCESS
      // ======================================================================

      await apiRequest(`/orders/${orderResponse.order.id}/payment`, {
        method: "PUT",
        body: JSON.stringify({
          payment_status: "paid",
        }),
      });

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

/*
|--------------------------------------------------------------------------
| LOADER
|--------------------------------------------------------------------------
*/

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
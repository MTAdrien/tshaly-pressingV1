console.log("checkout.js chargé");

/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const checkoutButton = document.querySelector(".checkout-btn");
const slots = document.querySelectorAll(".slot");

let selectedSlot = null;

/*
|--------------------------------------------------------------------------
| SLOT SELECTION
|--------------------------------------------------------------------------
*/

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    slots.forEach((s) => s.classList.remove("active"));

    slot.classList.add("active");

    selectedSlot = slot.textContent.trim();
  });
});

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

      await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          pickup_date: pickupDate,
          delivery_date: deliveryDate,
          items: cart,
        }),
      });

      localStorage.removeItem("cart");

      showToast("Réservation confirmée avec succès.", "success");

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
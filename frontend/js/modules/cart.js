// ==========================================================================
// | Cart Module
// | ------------------------------------------------------------------------
// | Gère le panier d'achat : ajout, suppression, affichage et stockage.
// | Le panier est stocké en localStorage pour la V1.
// ==========================================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//=========================================================================
// DOM ELEMENTS
//=========================================================================


const addButtons = document.querySelectorAll(".add-to-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");

// =========================================================================
//  AJOUTER AU PANIER
// =========================================================================

addButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.target.closest(".reservation-card");

    if (!card) return;

    const serviceName = card.dataset.name;
    const price = Number(card.dataset.price);
    const quantityInput = card.querySelector(".quantity-input");
    const quantity = Number(quantityInput.value);

    if (!quantity || quantity <= 0) {
      showToast("Veuillez choisir une quantité valide.", "error");
      return;
    }

    const existingItem = cart.find((item) => {
      return item.service_name === serviceName;
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        service_name: serviceName,
        price,
        quantity,
      });
    }

    saveCart();
    renderCart();

    showToast("Article ajouté au panier.", "success");
  });
});

// ==========================================================================
//  SAUVEGARDER LE PANIER
// =========================================================================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================================================================
//  RENDER LE PANIER
// =========================================================================

function renderCart() {
  updateCartCount();

  if (!cartItemsContainer || !cartTotal) {
    return;
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Aucun article ajouté pour le moment.</p>";
    cartTotal.textContent = "0€";
    return;
  }

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div>
        <strong>${item.service_name}</strong>
        x${item.quantity}
      </div>

      <div>
        ${item.price * item.quantity}€
      </div>

      <button class="remove-btn" data-index="${index}">
        ✕
      </button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `${total}€`;
  initRemoveButtons();
}

// ==========================================================================
//  SUPPRIMER UN ARTICLE
// ==========================================================================

function initRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      saveCart();
      renderCart();

      showToast("Article retiré du panier.", "info");
    });
  });
}

// ==========================================================================
//  MISE À JOUR DU COMPTEUR
// ==========================================================================

function updateCartCount() {
  if (!cartCount) return;

  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = savedCart.reduce((acc, item) => {
    return acc + Number(item.quantity || 0);
  }, 0);

  cartCount.textContent = totalItems;
  cartCount.classList.toggle("hidden", totalItems === 0);
}

// ==========================================================================
//  INIT
// ==========================================================================

renderCart();
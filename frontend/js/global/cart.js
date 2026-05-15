// Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements

const addButtons =
  document.querySelectorAll(".add-to-cart-btn");

const cartItemsContainer =
  document.getElementById("cart-items");

const cartTotal =
  document.getElementById("cart-total");

const cartCount =
  document.getElementById("cart-count");

const cartSection =
  document.getElementById("cart-section");

// AJOUT AU PANIER

addButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    // éviter les autres boutons CTA
    const card = event.target.closest(".reservation-card");

    if (!card) return;

    const serviceName = card.dataset.name;

    const price = Number(card.dataset.price);

    const quantityInput = card.querySelector(".quantity-input");

    const quantity = Number(quantityInput.value);

    const existingItem = cart.find(
      (item) => item.service_name === serviceName
    );

    // si article déjà présent
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

  });

});

// SAVE LOCAL STORAGE

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

// RENDER CART

function renderCart() {

  // SECURITY

  if (!cartCount) return;

  if (!cartItemsContainer || !cartTotal) {

    updateCartCount();

    return;

  }

  // VISIBILITY

  if (cart.length === 0) {

    if (cartSection) {
      cartSection.classList.add("hidden");
    }

    cartCount.classList.add("hidden");

  } else {

    if (cartSection) {
      cartSection.classList.remove("hidden");
    }

    cartCount.classList.remove("hidden");

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

      <button
        class="remove-btn"
        data-index="${index}"
      >
        ✕
      </button>
    `;

    cartItemsContainer.appendChild(cartItem);

  });

  cartTotal.textContent = `${total}€`;

  updateCartCount();

  addRemoveEvents();

}

// REMOVE ITEM

function addRemoveEvents() {

  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cart.splice(index, 1);

      saveCart();

      renderCart();

    });

  });

}

// UPDATE CART COUNT

function updateCartCount() {

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  cartCount.textContent = totalItems;

}

// Initial render

renderCart();

// JSON API READY PAYLOAD

function prepareOrderPayload() {

  return {
    items: cart,
  };

}

// TEST

console.log(
  prepareOrderPayload()
);
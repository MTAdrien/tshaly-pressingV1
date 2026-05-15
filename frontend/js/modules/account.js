/*
|--------------------------------------------------------------------------
| ACCOUNT PAGE
|--------------------------------------------------------------------------
*/

const userInfo = document.getElementById("user-info");
const ordersContainer = document.getElementById("orders-container");

/*
|--------------------------------------------------------------------------
| RENDER USER
|--------------------------------------------------------------------------
*/

function renderUser(user) {
  userInfo.innerHTML = `
    <p><strong>Prénom :</strong> ${user.firstname || "Non renseigné"}</p>
    <p><strong>Nom :</strong> ${user.lastname || "Non renseigné"}</p>
    <p><strong>Email :</strong> ${user.email || "Non renseigné"}</p>
    <p><strong>Téléphone :</strong> ${user.phone || "Non renseigné"}</p>
    <p><strong>Adresse :</strong> ${user.address || "Non renseigné"}</p>
  `;
}

/*
|--------------------------------------------------------------------------
| RENDER ORDERS
|--------------------------------------------------------------------------
*/

function renderOrders(orders) {
  if (!orders || orders.length === 0) {
    ordersContainer.innerHTML = "<p>Aucune commande pour le moment.</p>";
    return;
  }

  ordersContainer.innerHTML = "";

  orders.forEach((order) => {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card");

    const itemsDetails = order.items
      .map((item) => {
        return `${item.quantity} x ${item.service_name}`;
      })
      .join(", ");

    orderCard.innerHTML = `
      <div>
        <strong>Commande #${order.id}</strong>
      </div>

      <p>
        <strong>Prix :</strong>
        ${Number(order.total_price || 0)}€
      </p>

      <p>
        <strong>Statut :</strong>
        <span class="status ${order.status}">
          ${order.status || "en attente"}
        </span>
      </p>

      <p>
        <strong>Date de collecte :</strong>
        ${order.pickup_date || "Non renseignée"}
      </p>

      <p>
        <strong>Date de livraison prévue :</strong>
        ${order.delivery_date || "Non renseignée"}
      </p>

      <p>
        <strong>Détail de la commande :</strong>
        ${itemsDetails || "Aucun détail disponible"}
      </p>
    `;

    ordersContainer.appendChild(orderCard);
  });
}

/*
|--------------------------------------------------------------------------
| LOAD ACCOUNT DATA
|--------------------------------------------------------------------------
*/

async function loadAccountData() {
  try {
    const profile = await apiRequest("/users/profile");
    const orders = await apiRequest("/orders/my-orders");

    renderUser(profile);
    renderOrders(orders);
  } catch (error) {
    showToast(error.message, "error");

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    setTimeout(() => {
      window.location.href = "connexion.html";
    }, 800);
  }
}

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

loadAccountData();
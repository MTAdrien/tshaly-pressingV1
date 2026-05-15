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

    orderCard.innerHTML = `
      <div>
        <strong>Commande #${order.id}</strong>
      </div>

      <div>
        ${Number(order.total_price || 0)}€
      </div>

      <div>
        <span class="status ${order.status}">
          ${order.status || "en attente"}
        </span>
      </div>

      <div>
        <small>Collecte : ${order.pickup_date || "Non renseignée"}</small>
      </div>

      <div>
        <small>Livraison : ${order.delivery_date || "Non renseignée"}</small>
      </div>
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
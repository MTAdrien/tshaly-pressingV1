/*
|--------------------------------------------------------------------------
| PROTECTION
|--------------------------------------------------------------------------
*/

const adminUser = getCurrentUser();

if (!adminUser || adminUser.role !== "admin") {
  window.location.href = "connexion.html";
  throw new Error("Accès dashboard refusé");
}

/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const totalOrders = document.getElementById("total-orders");
const totalRevenue = document.getElementById("total-revenue");
const pendingOrders = document.getElementById("pending-orders");
const totalClients = document.getElementById("total-clients");
const adminOrders = document.getElementById("admin-orders");

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

let orders = [];

/*
|--------------------------------------------------------------------------
| RENDER STATS
|--------------------------------------------------------------------------
*/

function renderStats(stats) {
  totalOrders.textContent = stats.totalOrders || 0;
  totalRevenue.textContent = `${Number(stats.totalRevenue || 0)}€`;
  pendingOrders.textContent = stats.pendingOrders || 0;
  totalClients.textContent = stats.totalClients || 0;
}

/*
|--------------------------------------------------------------------------
| RENDER ORDERS
|--------------------------------------------------------------------------
*/

function renderOrders() {
  adminOrders.innerHTML = "";

  if (!orders || orders.length === 0) {
    adminOrders.innerHTML = "<p>Aucune commande.</p>";
    return;
  }

  orders.forEach((order) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("admin-order-card");

    orderCard.innerHTML = `
      <div class="order-top">
        <div>
          <strong>Commande #${order.id}</strong>
        </div>

        <div>
          ${Number(order.total_price || 0)}€
        </div>
      </div>

      <div class="order-details">
        <p>
          <strong>Client :</strong>
          ${order.firstname || ""} ${order.lastname || ""}
        </p>

        <p>
          <strong>Collecte :</strong>
          ${order.pickup_date || "Non renseignée"}
        </p>

        <p>
          <strong>Livraison :</strong>
          ${order.delivery_date || "Non renseignée"}
        </p>

        <p>
          <strong>Statut actuel :</strong>
          ${order.status || "en_attente"}
        </p>
      </div>

      <div class="order-actions">
        <select class="status-select" data-id="${order.id}">
          <option value="en_attente">En attente</option>
          <option value="collecte">Collecté</option>
          <option value="en_traitement">En traitement</option>
          <option value="pret">Prêt</option>
          <option value="livre">Livré</option>
        </select>
      </div>
    `;

    adminOrders.appendChild(orderCard);

    const select = orderCard.querySelector(".status-select");
    select.value = order.status || "en_attente";
  });

  initStatusEvents();
}

/*
|--------------------------------------------------------------------------
| STATUS EVENTS
|--------------------------------------------------------------------------
*/

function initStatusEvents() {
  const selects = document.querySelectorAll(".status-select");

  selects.forEach((select) => {
    select.addEventListener("change", async () => {
      const orderId = select.dataset.id;
      const newStatus = select.value;

      try {
        await apiRequest(`/orders/${orderId}/status`, {
          method: "PUT",
          body: JSON.stringify({
            status: newStatus,
          }),
        });

        showToast("Statut mis à jour", "success");

        await loadDashboard();
      } catch (error) {
        showToast(error.message, "error");
      }
    });
  });
}

/*
|--------------------------------------------------------------------------
| LOAD DASHBOARD
|--------------------------------------------------------------------------
*/

async function loadDashboard() {
  try {
    const stats = await apiRequest("/admin/stats");
    orders = await apiRequest("/orders");

    renderStats(stats);

    renderOrders();
  } catch (error) {
    showToast(error.message, "error");
  }
}

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

loadDashboard();
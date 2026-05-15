// =======================================================================
// Fichier : frontend/js/modules/account.js
// Description : Gère la page de compte utilisateur, affichant les informations personnelles et les commandes passées.
// Auteur : Muyard Tayayi Adrien
// Date de création : 5 Mai 2026
// =======================================================================

// =====================================================================
// DOM 
// =====================================================================

const profileForm = document.getElementById("profile-form");
const profileFirstname = document.getElementById("profile-firstname");
const profileLastname = document.getElementById("profile-lastname");
const profilePhone = document.getElementById("profile-phone");
const profileAddress = document.getElementById("profile-address");
const logoutBtn = document.getElementById("logout-btn");

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

// =====================================================================
// INFOS UTILISATEUR
// =====================================================================

function fillProfileForm(user) {
  profileFirstname.value = user.firstname || "";
  profileLastname.value = user.lastname || "";
  profilePhone.value = user.phone || "";
  profileAddress.value = user.address || "";
}

// =====================================================================
// STATUS LABELS
// =====================================================================

const STATUS_LABELS = {
  en_attente: "En attente",
  collecte: "Collecté",
  en_traitement: "En traitement",
  pret: "Prêt",
  livre: "Livré",
};

function formatStatus(status) {
  return STATUS_LABELS[status] || "En attente";
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
          ${formatStatus(order.status)}
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

// =====================================================================
// MODIFICATIONS PROFIL
// =====================================================================

if (profileForm) {
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await apiRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify({
          firstname: profileFirstname.value.trim(),
          lastname: profileLastname.value.trim(),
          phone: profilePhone.value.trim(),
          address: profileAddress.value.trim(),
        }),
      });

      localStorage.setItem("currentUser", JSON.stringify(data.user));

      renderUser(data.user);
      fillProfileForm(data.user);

      showToast("Profil mis à jour", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}

// =====================================================================
// LOGOUT
// =====================================================================

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
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
    fillProfileForm(profile);
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
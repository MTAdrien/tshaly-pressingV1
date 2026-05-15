
// Mock user data

const accountUser = getCurrentUser();

// DOM ELEMENTS

const userInfo =
    document.getElementById("user-info");

const ordersContainer =
    document.getElementById("orders-container");

// LOAD USER

function renderUser() {

    userInfo.innerHTML = `
        <p><strong>Nom :</strong> ${accountUser.name}</p>
        <p><strong>Email :</strong> ${accountUser.email}</p>
        <p><strong>Téléphone :</strong> ${accountUser.phone}</p>
        <p><strong>Adresse :</strong> ${accountUser.address}</p>
    `;

}

// LOAD ORDERS LOCAL STORAGE 

function renderOrders() {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        ordersContainer.innerHTML =
            "<p>Aucune commande pour le moment.</p>";

        return;
    }

    ordersContainer.innerHTML = "";

    orders.forEach(order => {

        const orderCard =
            document.createElement("div");

        orderCard.classList.add("order-card");

        orderCard.innerHTML = `

    <div>
        <strong>Commande #${order.id || "N/A"}</strong>
    </div>

    <div>
        ${order.total || 0}€
    </div>

    <div>
        <span class="status ${order.status}">
            ${order.status || "en attente"}
        </span>
    </div>

    <button
        class="order-detail-btn"
        data-id="${order.id}"
    >
        Voir détails
    </button>

`;

        ordersContainer.appendChild(orderCard);

    });

    document.querySelectorAll(".order-detail-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const orders =
                JSON.parse(localStorage.getItem("orders")) || [];

            const order =
                orders.find(o => o.id == btn.dataset.id);

            if (!order) return;

            showToast(
                `Commande #${order.id} • ${order.total}€ • ${order.items.length} article(s)`,
                "info"
            );

        });

    });

}

// ==========================================================================
// DÉTAIL DE COMMANDE
// ==========================================================================

function showOrderDetails(orderId) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const order =
        orders.find(o => o.id === orderId);

    if (!order) return;

    alert(JSON.stringify(order, null, 2));

}

// INIT

renderUser();
renderOrders();
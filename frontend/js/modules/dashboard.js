// PROTECTION

const adminUser = getCurrentUser();

if (!adminUser || adminUser.role !== "admin") {
    if (typeof showToast === "function") {
        showToast("Accès refusé", "error");
    }

    window.location.href = "connexion.html";

    throw new Error("Accès dashboard refusé");
}

/*
|--------------------------------------------------------------------------
| LOAD DATA
|--------------------------------------------------------------------------
*/

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

const users =
    JSON.parse(localStorage.getItem("users")) || [];

/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const totalOrders =
    document.getElementById("total-orders");

const totalRevenue =
    document.getElementById("total-revenue");

const pendingOrders =
    document.getElementById("pending-orders");

const totalClients =
    document.getElementById("total-clients");

const adminOrders =
    document.getElementById("admin-orders");

/*
|--------------------------------------------------------------------------
| STATS
|--------------------------------------------------------------------------
*/

function renderStats() {

    totalOrders.textContent =
        orders.length;

    const revenue =
        orders.reduce((sum, order) => {

            return sum + order.total;

        }, 0);

    totalRevenue.textContent =
        `${revenue}€`;

    const pending =
        orders.filter(order =>
            order.status === "en attente"
        );

    pendingOrders.textContent =
        pending.length;

    totalClients.textContent =
        users.length;

}

/*
|--------------------------------------------------------------------------
| RENDER ORDERS
|--------------------------------------------------------------------------
*/

function renderOrders() {

    adminOrders.innerHTML = "";

    if (orders.length === 0) {

        adminOrders.innerHTML =
            "<p>Aucune commande.</p>";

        return;
    }

    orders.forEach(order => {

        const orderCard =
            document.createElement("div");

        orderCard.classList.add("admin-order-card");

        orderCard.innerHTML = `

            <div class="order-top">

                <div>
                    <strong>Commande #${order.id}</strong>
                </div>

                <div>
                    ${order.total}€
                </div>

            </div>

            <div class="order-details">

                <p>
                    <strong>Collecte :</strong>
                    ${order.pickupDate}
                </p>

                <p>
                    <strong>Livraison :</strong>
                    ${order.deliveryDate}
                </p>

                <p>
                    <strong>Créneau :</strong>
                    ${order.slot}
                </p>

            </div>

            <div class="order-actions">

                <select
                    class="status-select"
                    data-id="${order.id}"
                >

                    <option value="en attente">
                        En attente
                    </option>

                    <option value="récupéré">
                        Récupéré
                    </option>

                    <option value="en lavage">
                        En lavage
                    </option>

                    <option value="prêt">
                        Prêt
                    </option>

                    <option value="livré">
                        Livré
                    </option>

                </select>

            </div>

        `;

        adminOrders.appendChild(orderCard);

    });

    initStatusEvents();

}

/*
|--------------------------------------------------------------------------
| STATUS EVENTS
|--------------------------------------------------------------------------
*/

function initStatusEvents() {

    const selects =
        document.querySelectorAll(".status-select");

    selects.forEach(select => {

        select.addEventListener("change", () => {

            const orderId =
                Number(select.dataset.id);

            const order =
                orders.find(order =>
                    order.id === orderId
                );

            order.status =
                select.value;

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            renderStats();

        });

    });

}

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

renderStats();
renderOrders();
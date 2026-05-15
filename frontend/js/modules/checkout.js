console.log("checkout.js chargé");

/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const checkoutButton =
    document.querySelector(".checkout-btn");

/*
|--------------------------------------------------------------------------
| SLOT
|--------------------------------------------------------------------------
*/

let selectedSlot = null;

const slots =
    document.querySelectorAll(".slot");

slots.forEach(slot => {

    slot.addEventListener("click", () => {

        slots.forEach(s =>
            s.classList.remove("active")
        );

        slot.classList.add("active");

        selectedSlot = slot.textContent;

    });

});

// ===========================================================================
// PROTECTION CHECKOUT
// ===========================================================================
checkoutButton.addEventListener("click", () => {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        showToast(
            "Vous devez être connecté pour réserver.",
            "error"
        );

        setTimeout(() => {
            window.location.href = "connexion.html";
        }, 800);

        return;
    }
});

/*
|--------------------------------------------------------------------------
| CHECKOUT
|--------------------------------------------------------------------------
*/

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        /*
        |--------------------------------------------------------------------------
        | LOAD CART
        |--------------------------------------------------------------------------
        */

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        /*
        |--------------------------------------------------------------------------
        | DATES
        |--------------------------------------------------------------------------
        */

        const pickupDate =
            document.getElementById("pickup-date").value;

        const deliveryDate =
            document.getElementById("delivery-date").value;

        /*
        |--------------------------------------------------------------------------
        | VALIDATION
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | TOTAL
        |--------------------------------------------------------------------------
        */

        const total =
            cart.reduce((sum, item) => {

                return (
                    sum + item.price * item.quantity
                );

            }, 0);

        /*
        |--------------------------------------------------------------------------
        | CREATE ORDER
        |--------------------------------------------------------------------------
        */

        const orders =
            JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {

            userId: currentUser.id,

            userName: currentUser.name,
            
            userEmail: currentUser.email,

            id: Date.now(),

            items: cart,

            total: total,

            pickupDate: pickupDate,

            deliveryDate: deliveryDate,

            slot: selectedSlot,

            status: "en attente",

            paymentStatus: "payé",

            createdAt: new Date().toISOString()

        };

        orders.push(newOrder);

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        /*
        |--------------------------------------------------------------------------
        | CLEAR CART
        |--------------------------------------------------------------------------
        */

        localStorage.removeItem("cart");

        /*
        |--------------------------------------------------------------------------
        | SUCCESS
        |--------------------------------------------------------------------------
        */

        showToast("Réservation confirmée avec succès.", "success");

        /*
        |--------------------------------------------------------------------------
        | REDIRECT
        |--------------------------------------------------------------------------
        */

        window.location.href =
            "mon-compte.html";

    });
};

// ===========================================================================
// LOADER
// ===========================================================================

function setLoading(button, isLoading) {

    const text =
        button.querySelector(".btn-text");

    const loader =
        button.querySelector(".btn-loader");

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


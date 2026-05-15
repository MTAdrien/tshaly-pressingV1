/*
|--------------------------------------------------------------------------
| AUTH NAVBAR
|--------------------------------------------------------------------------
*/

const authUser = getCurrentUser();

const accountLink =
    document.getElementById("account-link");

/*
|--------------------------------------------------------------------------
| SAFE GUARD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| USER CONNECTED
|--------------------------------------------------------------------------
*/

if (authUser && accountLink) {

    accountLink.textContent = authUser.name ? "Mon compte" : "Connexion";
    accountLink.href = "mon-compte.html";

} else if (accountLink) {

    accountLink.textContent = "Connexion";
    accountLink.href = "connexion.html";
}

// ===========================================================================
// LIEN DASHBOARD ADMIN
// ===========================================================================

const headerMenu =
    document.querySelector(".header-menu");

if (authUser && authUser.role === "admin") {

    const adminLi =
        document.createElement("li");

    const adminLink =
        document.createElement("a");

    adminLink.href =
        "dashboard.html";

    adminLink.textContent =
        "Dashboard";

    adminLi.appendChild(adminLink);

    headerMenu.appendChild(adminLi);

}
/*
|--------------------------------------------------------------------------
| ACCOUNT GUARD
|--------------------------------------------------------------------------
*/

const guardUser = getCurrentUser();

/*
|--------------------------------------------------------------------------
| USER NOT CONNECTED
|--------------------------------------------------------------------------
*/

if (!guardUser) {

    if (typeof showToast === "function") {
        showToast("Connexion requise", "error");
    }

    setTimeout(() => {
        window.location.href = "connexion.html";
    }, 800);

}
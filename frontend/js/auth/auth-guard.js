const user = getCurrentUser();

if (!user) {

    if (typeof showToast === "function") {
        showToast("Connexion requise", "error");
    }

    setTimeout(() => {
        window.location.href = "connexion.html";
    }, 800);

}
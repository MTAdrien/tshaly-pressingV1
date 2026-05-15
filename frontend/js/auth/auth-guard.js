/*
|--------------------------------------------------------------------------
| ADMIN GUARD
|--------------------------------------------------------------------------
*/

const guardUser = getCurrentUser();

if (!isAuthenticated()) {
  if (typeof showToast === "function") {
    showToast("Connexion requise", "error");
    window.location.href = "connexion.html";
  };
}

if (guardUser && guardUser.role !== "admin") {
  if (typeof showToast === "function") {
    showToast("Accès administrateur requis", "error");
    window.location.href = "mon-compte.html";
  };
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getToken() {
  return localStorage.getItem("token");
}

function isAuthenticated() {
  return !!getToken() && !!getCurrentUser();
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");

  window.location.href = "connexion.html";
}

const currentUser = getCurrentUser();
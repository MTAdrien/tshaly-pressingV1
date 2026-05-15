function getCurrentUser() {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    return null;
  }
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
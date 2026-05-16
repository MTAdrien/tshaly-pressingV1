//
// ===========================================================================
//  API CONFIG
// ===========================================================================
//  En développement local, l'API pointe vers localhost.
//  En production, elle pointe vers le backend Render.
// --------------------------------------------------------------------------
//

const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : "https://tshaly-pressingv1.onrender.com/api";

// /*
// ===========================================================================
//  API REQUEST HELPER
// ===========================================================================
//  Fonction centralisée pour communiquer avec le backend.
//  Elle ajoute automatiquement le token JWT si l'utilisateur est connecté.
// --------------------------------------------------------------------------
//

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur API");
  }

  return data;
}
const authUser = getCurrentUser();

const accountLink = document.getElementById("account-link");
const headerMenu = document.querySelector(".header-menu");

if (authUser && accountLink) {
  accountLink.textContent = "Mon compte";
  accountLink.href = "mon-compte.html";
} else if (accountLink) {
  accountLink.textContent = "Connexion";
  accountLink.href = "connexion.html";
}

if (authUser && authUser.role === "admin" && headerMenu) {
  const adminLi = document.createElement("li");
  const adminLink = document.createElement("a");

  adminLink.href = "dashboard.html";
  adminLink.textContent = "Dashboard";

  adminLi.appendChild(adminLink);
  headerMenu.appendChild(adminLi);
}

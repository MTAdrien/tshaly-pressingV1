/*
|--------------------------------------------------------------------------
| LOGIN BACKEND
|--------------------------------------------------------------------------
*/

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      showToast("Connexion réussie.", "success");

      setTimeout(() => {
        window.location.href = "mon-compte.html";
      }, 800);
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}

/*
|--------------------------------------------------------------------------
| REGISTER BACKEND
|--------------------------------------------------------------------------
*/

const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    const nameParts = name.split(" ");
    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(" ") || "Non renseigné";

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      showToast("Compte créé avec succès.", "success");

      setTimeout(() => {
        window.location.href = "mon-compte.html";
      }, 800);
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}
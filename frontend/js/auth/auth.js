/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

const loginForm =
    document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("login-email").value;

        const password =
            document.getElementById("login-password").value;

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => {

            return (
                user.email === email &&
                user.password === password
            );

        });

        if (!user) {

            showToast("Identifiants incorrects.", "error");

            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        showToast("Connexion réussie.", "success");

        window.location.href =
            "mon-compte.html";

    });

}

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("register-name").value;

        const email =
            document.getElementById("register-email").value;

        const password =
            document.getElementById("register-password").value;

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists =
            users.find(user => user.email === email);

        if (alreadyExists) {

            showToast("Compte déjà existant.", "error");

            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        showToast("Compte créé avec succès.", "success");

        window.location.href =
            "connexion.html";

    });

}
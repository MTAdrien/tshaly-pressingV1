const loginForm =
    document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("login-email").value;

        const password =
            document.getElementById("login-password").value;

        // MOCK USER V1
        const mockUser = {

            id: Date.now(),

            name: "Adrien",

            email: "test@test.com",

            password: 123456,

            role: "client"

        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(mockUser)
        );

        showToast(
            "Connexion réussie",
            "success"
        );

        setTimeout(() => {

            window.location.href =
                "mon-compte.html";

        }, 800);

    });

}
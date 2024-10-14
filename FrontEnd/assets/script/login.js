


//creation de l evenement login

document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById("loginForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    if (reponse.ok) {
        const data = await reponse.json();

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            window.location.href = "index.html";
        }
    } else {
        const errorMessage = await reponse.text();
        alert('Email et/ou Mot de passe incorrect');
    }

});
});
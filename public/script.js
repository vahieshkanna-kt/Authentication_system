// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        });

        const data = await response.json();
        document.getElementById("message").textContent = data.message;

        if (response.ok) {
            window.location.href = "login.html";
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.getElementById("loginEmail").value,
                password: document.getElementById("loginPassword").value
            })
        });

        const data = await response.json();
        document.getElementById("message").textContent = data.message;

        if (response.ok) {
            window.location.href = "dashboard.html";
        }
    });
}

// LOAD PROTECTED DASHBOARD
async function loadDashboard() {
    const response = await fetch("/api/auth/dashboard");

    if (!response.ok) {
        window.location.href = "login.html";
        return;
    }

    const data = await response.json();

    document.getElementById("welcome").textContent =
        "Welcome, " + data.user.name;

    document.getElementById("userEmail").textContent =
        data.user.email;
}

if (window.location.pathname.endsWith("dashboard.html")) {
    loadDashboard();
}

// LOGOUT
async function logout() {
    await fetch("/api/auth/logout", {
        method: "POST"
    });

    window.location.href = "login.html";
}
const loginForm = document.getElementById("loginForm");
const homePage = document.getElementById("homePage");
const welcomeMessage = document.getElementById("welcomeMessage");
const previousLogins = document.getElementById("previousLogins");
const userMessages = document.getElementById("userMessages");

function toggleForms() {
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    homePage.style.display = homePage.style.display === "none" ? "block" : "none";
}

async function login() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, mobile }),
        });

        if (response.ok) {
            toggleForms();
            loadHomePage();
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function loadHomePage() {
    try {
        const response = await fetch("http://localhost:3000/home", {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            welcomeMessage.textContent = data.message;

            previousLogins.innerHTML = "";
            data.previousLogins.forEach((login) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Timestamp: ${login.timestamp}, Duration: ${login.duration}`;
                previousLogins.appendChild(listItem);
            });

            userMessages.innerHTML = "";
            data.messages.forEach((message) => {
                const listItem = document.createElement("li");
                listItem.textContent = message;
                userMessages.appendChild(listItem);
            });
        } else {
            alert("Failed to load the home page.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function addMessage() {
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:3000/home/add-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            loadHomePage();
        } else {
            alert("Failed to add the message.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

fetch("http://localhost:3000/home")
    .then((response) => {
        if (response.ok) {
            toggleForms();
            loadHomePage();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

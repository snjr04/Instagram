document.addEventListener("DOMContentLoaded", function () {
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
    const toggleText = document.getElementById("toggle-password");
    const errorMessage = document.getElementById("error-message");
    const hiddenText = document.getElementById("hidden-text");

    function updateButtonColor() {
        const username = inputUsername.value.trim();
        const password = inputPassword.value.trim();

        loginButton.style.background = (username.length > 0 && password.length > 0) ? "#0095F6" : "#0069ad";
    }

    inputUsername.addEventListener("input", updateButtonColor);
    inputPassword.addEventListener("input", updateButtonColor);

    loginButton.addEventListener("click", async function () {
        let loader = document.getElementById("loader");
        let text = document.getElementById("hidden-text");
        var button = this;

        button.classList.add("spinner");
        text.style.display = "none";
        loader.style.display = "flex";
        errorMessage.style.display = "none"; // Скрываем ошибку перед отправкой запроса

        const username = inputUsername.value.trim();
        const password = inputPassword.value.trim();

        try {
            const response = await fetch("http://127.0.0.1:3000/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!data.error) {
                window.location.href = data.redirectUrl;
            } else {
                loader.style.display = "none";
                text.style.display = "flex";
                errorMessage.style.display = "block";
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    });

    // Скрытие ошибки при клике на неё
    errorMessage.addEventListener("click", function () {
        this.style.display = "none";
    });

    // Переключение видимости пароля
    toggleText.addEventListener("click", function () {
        inputPassword.type = inputPassword.type === "password" ? "text" : "password";
        toggleText.textContent = inputPassword.type === "password" ? "Показать" : "Скрыть";
    });

    updateButtonColor();
});

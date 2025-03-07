document.addEventListener("DOMContentLoaded", function () {
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
    const toggleText = document.getElementById("toggle-password");
    const ErrorMassage = document.getElementById("error-message");

    let clickCount = 0;

    loginButton.addEventListener("click", async function () {
        clickCount++;
        console.log(`Кнопка нажата ${clickCount} раз(а)`);

        const username = inputUsername.value.trim();
        const password = inputPassword.value.trim();

        try {
            const response = await fetch("http://localhost:30000/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!data.error) {
                window.location.href = data.redirectUrl;
            } else {
                ErrorMassage.style.display = "block";
                ErrorMassage.textContent = data.message;
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    });

    // Переключение видимости пароля
    toggleText.addEventListener("click", function () {
        inputPassword.type = inputPassword.type === "password" ? "text" : "password";
        toggleText.textContent = inputPassword.type === "password" ? "Показать" : "Скрыть";
    });
});

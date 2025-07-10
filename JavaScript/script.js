document.getElementById("registration-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  const successBox = document.getElementById("success");
  successBox.textContent = "";
  successBox.className = "";

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const familyName = document.getElementById("family-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const street = document.getElementById("street").value.trim();
  const city = document.getElementById("city").value.trim();
  const postalCode = document.getElementById("postal-code").value.trim();

  let hasError = false;

  if (username.length < 3 || username.length > 10) {
    document.getElementById("username-error").textContent =
      "Потребителското име трябва да е между 3 и 10 символа.";
    hasError = true;
  }

  if (!name || name.length > 50) {
    document.getElementById("name-error").textContent =
      "Името трябва да е до 50 символа.";
    hasError = true;
  }

  if (!familyName || familyName.length > 50) {
    document.getElementById("family-name-error").textContent =
      "Фамилията трябва да е до 50 символа.";
    hasError = true;
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) {
    document.getElementById("email-error").textContent =
      "Невалиден имейл адрес.";
    hasError = true;
  }

  if (
    password.length < 6 ||
    password.length > 10 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    document.getElementById("password-error").textContent =
      "Паролата трябва да е между 6 и 10 символа и да съдържа главни, малки букви и цифри.";
    hasError = true;
  }

  if (postalCode && !/^(\d{4}|\d{5}-\d{4})$/.test(postalCode)) {
    document.getElementById("postal-code-error").textContent =
      "Пощенският код трябва да е във формат 1111 или 11111-1111.";
    hasError = true;
  }

  if (hasError) return;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const usernameExists = users.some(user =>
      user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      document.getElementById("username-error").textContent =
        "Потребител с това име вече съществува.";
      return;
    }

    const newUser = {
      username,
      name,
      familyName,
      email,
      password,
      address: {
        street,
        city,
        postalCode
      }
    };

    const postResponse = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (postResponse.ok) {
      successBox.textContent = "Успешна регистрация!";
      successBox.className = "success";
      document.getElementById("registration-form").reset();
    } else {
      successBox.textContent = "Грешка при регистрацията.";
      successBox.className = "error";
    }
  } catch (err) {
    console.error("Грешка при заявка:", err);
    successBox.textContent = "Грешка при връзка със сървъра.";
    successBox.className = "error";
  }
});

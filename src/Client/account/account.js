const pictureURLButton = document.getElementById("picture-btn");
const pictureURL = document.getElementById("picture");

const emailButton = document.getElementById("email-btn");
const email = document.getElementById("email");

const passwordButton = document.getElementById("email-btn");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");

const globalUserId = JSON.parse(window.localStorage.getItem("auth")).userId;

async function updateUser(type, values) {
  const body = {
    type: type,
    email: values.email || null,
    password: values.password || null,
    confirm: values.confirm || null,
    picture: values.picture || null,
  };

  const response = await fetch(`/users/${globalUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await response.json();
}

pictureURLButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateUser("picture", { picture: pictureURL.value });
});

emailButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateUser("email", { email: email.value });
});

passwordButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateUser("password", { password: password.value, confirm: confirmation.value });
});

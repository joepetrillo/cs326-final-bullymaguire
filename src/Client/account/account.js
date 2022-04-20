const auth = JSON.parse(window.localStorage.getItem("auth"));

if (!auth) {
  window.location.href = "/login";
} else {
  const myProfileButton = document.getElementById("profile-button");
  myProfileButton.href = `/profile/${auth.userId}`;
}

const pictureURLButton = document.getElementById("picture-btn");
const pictureURL = document.getElementById("picture");
const email = document.getElementById("email");

const passwordButton = document.getElementById("password-btn");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");

const profileUsername = document.getElementById("profile-username");
const profilePicture = document.getElementById("profile-picture");

const buttons = {
  pictureButton: document.getElementById("picture-btn"),
  emailButton: document.getElementById("email-btn"),
  passwordButton: document.getElementById("password-btn"),
};

const statusIndicators = {
  pictureStatus: document.getElementById("picture-status"),
  emailStatus: document.getElementById("email-status"),
  passwordStatus: document.getElementById("password-status"),
};

const populateUserData = async (userId) => {
  const userRes = await fetch(`/users/${userId}`);
  const userData = await userRes.json();
  const username = userData.username;

  profileUsername.innerText = `@${username}`;
  profilePicture.src = userData.picture;
};

async function updateUser(type, values) {
  const body = {
    type: type,
    email: type === "email" ? values.email : null,
    password: type === "password" ? values.password : null,
    confirm: type === "password" ? values.confirm : null,
    picture: type === "picture" ? values.picture : null,
  };

  buttons[`${type}Button`].disabled = true;

  const response = await fetch(`/users/${auth.userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    buttons[`${type}Button`].disabled = false;
    flashMessage(statusIndicators[`${type}Status`], "Success!", "text-success");
  }
}

buttons.pictureButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (pictureURL.value === "") {
    flashMessage(statusIndicators.pictureStatus, "Profile URLs cannot be blank!", "text-danger");
  } else {
    await updateUser("picture", { picture: pictureURL.value });
  }
});

buttons.emailButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (email.value === "") {
    flashMessage(statusIndicators.emailStatus, "Emails cannot be blank!", "text-danger");
  } else {
    await updateUser("email", { email: email.value });
  }
});

buttons.passwordButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (password.value !== confirmation.value) {
    flashMessage(statusIndicators.passwordStatus, "Passwords do not match!", "text-danger");
  } else if (password.value === "" || confirmation.value === "") {
    flashMessage(statusIndicators.passwordStatus, "Passwords cannot be blank!", "text-danger");
  } else {
    await updateUser("password", { password: password.value, confirm: confirmation.value });
  }
});

const flashMessage = (msg, message, color) => {
  msg.classList.add(color);
  msg.innerText = message;
  setTimeout(() => {
    msg.innerText = "";
    msg.classList.remove(color);
  }, 3000);
};

populateUserData(auth.userId);

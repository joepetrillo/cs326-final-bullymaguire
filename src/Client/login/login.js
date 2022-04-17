const setAuth = (userId) => {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      authenticated: true,
      userId: userId,
    })
  );
};

// api call
const authenticate = async () => {
  // When auth is implemented
  return {
    auth: true,
    userId: "1001",
  };
};

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const { auth, userId } = await authenticate();
  if (auth) {
    setAuth(userId);
    window.location.href = "/";
  }
});

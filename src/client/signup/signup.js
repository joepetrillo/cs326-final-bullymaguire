const formNode = document.getElementById("signupForm");
const inputNodes = formNode.getElementsByTagName("INPUT");
const errorMsg = document.getElementById("errorMsg");
const formDefault = {
  email: "",
  username: "",
  password: "",
  confirm: "",
};

const cleanForm = () => {
  console.log("cleaning form");
  // Reset Form
  form = { ...formDefault };
  Array.from(inputNodes).forEach((node) => (node.value = ""));

  //   Redirect to Login
  window.location.href = "/login";
};

const flashErrorMessage = (message) => {
  errorMsg.innerText = message;
  setTimeout(() => {
    errorMsg.innerText = "";
  }, 2000);
};

const indicateUserNotCreated = () => {};

const validateData = ({ email, username, password, confirm }) => {
  let check = { status: true, message: undefined };
  if (email === "" || username === "" || password === "" || confirm === "") {
    check.status = false;
    check.message = "All fields must be filled";
  } else if (username.length < 0 || username.length > 16) {
    check.status = false;
    check.message = "Username must be between 1 and 16 character";
  } else if (password !== confirm) {
    check.status = false;
    check.message = "Password and confirm password must match";
  } else if (password.length < 4) {
    check.status = false;
    check.message = "Password must be at least 4 characters";
  }

  return check;
};

let form = { ...formDefault };

const updateFormProp = (e) => {
  form = { ...form, [e.target.id]: e.target.value };
};

Array.from(inputNodes).forEach((el) => {
  el.addEventListener("input", updateFormProp);
});

formNode.addEventListener("submit", async (e) => {
  e.preventDefault();
  let check = validateData(form);
  if (!check.status) {
    return flashErrorMessage(check.message);
  }

  const res = await fetch("/users", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(form),
  });

  if (res.status !== 200) {
    return flashErrorMessage("User not created. Please try again");
  }

  cleanForm();
});

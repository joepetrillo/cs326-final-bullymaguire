const auth = document.cookie.slice(5);

const myProfileButton = document.getElementById("profile-button");
myProfileButton.href = `/profile/${auth}`;

const genres = document.querySelectorAll(".genre__tags span");
const beatTitle = document.getElementById("beatTitleInput");
const beatLink = document.getElementById("beatUpload");
const submitButton = document.getElementById("upload_form_submit");
const errorMsg = document.getElementById("makePostErrorMsg");
const navProfilePicture = document.getElementById("user-profile-picture");

let form = {
  title: "",
  genre: "",
  beat: "",
};

const validateData = () => {
  const { title, genre, beat } = form;
  let error = { success: true, error: "" };

  if (title === "" || genre === "" || beat === "") {
    error = { success: false, error: "All fields must be present" };
  }
  return error;
};

const flashErrorMessage = (message, color) => {
  errorMsg.innerText = message;
  errorMsg.classList.add(color);
  setTimeout(() => {
    errorMsg.innerText = "";
    errorMsg.classList.remove(color);
  }, 2000);
};

genres.forEach((currGenre) => {
  currGenre.addEventListener("click", () => {
    form = {
      ...form,
      genre: currGenre.textContent,
    };
    currGenre.classList.add("badge__active");
    genres.forEach((g) => {
      if (g !== currGenre) {
        g.classList.remove("badge__active");
      }
    });
  });
});

beatTitle.addEventListener("input", (e) => {
  form = { ...form, title: e.target.value };
});

beatLink.addEventListener("input", (e) => {
  form = { ...form, beat: e.target.value };
});

submitButton.addEventListener("click", async () => {
  const check = validateData();

  if (!check.success) {
    return flashErrorMessage(check.error, "text-danger");
  }

  const res = await fetch("/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId: auth,
      title: form.title,
      genre: form.genre,
      audio: form.beat,
      parentId: null,
    }),
  });

  if (res.status !== 200) {
    return flashErrorMessage("Post could not be created, please try again", "text-danger");
  }

  const { postId } = await res.json();
  window.location.href = `/beat/${postId}`;
});

const populateUserData = async () => {
  const userRes = await fetch(`/users/${auth}`);
  const userData = await userRes.json();

  navProfilePicture.src = userData.picture;
};

populateUserData();

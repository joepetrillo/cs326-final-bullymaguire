import * as crudUtils from "./crudUtils.js";

const auth = document.cookie.slice(5);

// if (!auth) {
//   window.location.href = "/login";
// } else {
//   const myProfileButton = document.getElementById("profile-button");
//   myProfileButton.href = `/profile/${auth.userId}`;
// }

const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const navProfilePicture = document.getElementById("user-profile-picture");

let sort = "top";

topButton.addEventListener("click", () => {
  sort = "top";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateFeed("index", sort, null, feedDiv, auth, null);
});

latestButton.addEventListener("click", () => {
  sort = "latest";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateFeed("index", sort, null, feedDiv, auth, null);
});

crudUtils.populateFeed("index", sort, null, feedDiv, auth, null);
crudUtils.populateNavbarData(navProfilePicture, auth);

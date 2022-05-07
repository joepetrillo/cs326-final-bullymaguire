import * as crudUtils from "../crudUtils.js";

const auth = document.cookie.slice(5);

const myProfileButton = document.getElementById("profile-button");
myProfileButton.href = `/profile/${auth}`;

let url = window.location.href.substring(0, window.location.href.length - 1);
url = url.split("/");

if (url[url.length - 1] === "profile") {
  window.location.href = `/profile/${auth}`;
}

const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const profilePicture = document.getElementById("profile-picture");
const profileUsername = document.getElementById("profile-username");
const navProfilePicture = document.getElementById("user-profile-picture");

const beatsButton = document.getElementById("beats-button");
const songsButton = document.getElementById("songs-button");
const commentsButton = document.getElementById("comments-button");

const profileUserId = window.location.pathname.split("/")[2];

let sort = "top";
let filter = "beats";

myProfileButton.href = `/profile/${auth}`;

topButton.addEventListener("click", () => {
  sort = "top";
  crudUtils.updateSort("top", topButton, latestButton);
  crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
});

latestButton.addEventListener("click", () => {
  sort = "latest";
  crudUtils.updateSort("latest", topButton, latestButton);
  crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
});

beatsButton.addEventListener("click", () => {
  filter = "beats";
  crudUtils.updateFilter(filter, beatsButton, songsButton, commentsButton);
  crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
});

songsButton.addEventListener("click", () => {
  filter = "songs";
  crudUtils.updateFilter(filter, beatsButton, songsButton, commentsButton);
  crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
});

commentsButton.addEventListener("click", () => {
  filter = "comments";
  crudUtils.updateFilter(filter, beatsButton, songsButton, commentsButton);
  crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
});

const populateUserData = async () => {
  const userRes = await fetch(`/users/${profileUserId}`);
  const userData = await userRes.json();
  const username = userData.username;

  profileUsername.innerHTML = `@${username}`;
  profilePicture.src = userData.picture;
};

crudUtils.populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
crudUtils.populateNavbarData(navProfilePicture, auth);
populateUserData();

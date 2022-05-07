import * as crudUtils from "../crudUtils.js";

const auth = document.cookie.slice(5);

const beatId = window.location.pathname.split("/")[2];
const postTopDiv = document.getElementById("post-top");
const replyFeedDiv = document.getElementById("reply-feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const commentsButton = document.getElementById("comments-button");
const songsButton = document.getElementById("songs-button");
const allButton = document.getElementById("all-button");
const commentReplyToggle = document.getElementById("comment-box-tab");
const songReplyToggle = document.getElementById("reply-upload-tab");
const submitReplyButton = document.getElementById("reply-btn");
const songReplyButton = document.getElementById("song-reply-btn");
const commentReplyBox = document.getElementById("comment-reply-box");
const songReplyTitleBox = document.getElementById("reply-title-box");
const songReplyAudioBox = document.getElementById("reply-audio-box");
const navProfilePicture = document.getElementById("user-profile-picture");
const myProfileButton = document.getElementById("profile-button");
myProfileButton.href = `/profile/${auth}`;

let sort = "top";
let filter = "all";

submitReplyButton.addEventListener("click", async () => {
  if (commentReplyToggle.classList.contains("active")) {
    const replyContent = commentReplyBox.value;
    const res = await fetch(`/posts/${beatId}/comments`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: auth,
        postId: beatId,
        comment: replyContent,
      }),
    });
  }

  commentReplyBox.value = "";

  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

songReplyButton.addEventListener("click", async () => {
  if (songReplyToggle.classList.contains("active")) {
    const songTitle = songReplyTitleBox.value;
    const songAudio = songReplyAudioBox.value;

    const beatRes = await fetch(`/posts/${beatId}`);
    const beatData = await beatRes.json();
    const genre = beatData.genre;

    const res = await fetch(`/posts/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: auth,
        parentId: beatId,
        audio: songAudio,
        title: songTitle,
        genre: genre,
      }),
    });
  }

  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

topButton.addEventListener("click", () => {
  sort = "top";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

latestButton.addEventListener("click", () => {
  sort = "latest";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

allButton.addEventListener("click", () => {
  filter = "all";
  crudUtils.updateFilter(filter, allButton, songsButton, commentsButton);
  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

songsButton.addEventListener("click", () => {
  filter = "songs";
  crudUtils.updateFilter(filter, allButton, songsButton, commentsButton);
  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

commentsButton.addEventListener("click", () => {
  filter = "comments";
  crudUtils.updateFilter(filter, allButton, songsButton, commentsButton);
  crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
});

crudUtils.populatePostData(beatId, auth, postTopDiv);
crudUtils.populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, beatId);
crudUtils.populateNavbarData(navProfilePicture, auth);

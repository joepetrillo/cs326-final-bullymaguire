import * as crudUtils from "../crudUtils.js";

const auth = JSON.parse(window.localStorage.getItem("auth"));

if (!auth) {
  window.location.href = "/login";
}

const replyId = window.location.pathname.split("/")[2];
const postTopDiv = document.getElementById("post-top");
const replyFeedDiv = document.getElementById("reply-feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const submitReplyButton = document.getElementById("reply-btn");
const commentReplyBox = document.getElementById("comment-reply-box");
const navProfilePicture = document.getElementById("user-profile-picture");
const myProfileButton = document.getElementById("profile-button");
myProfileButton.href = `/profile/${auth.userId}`;

let sort = "top";

submitReplyButton.addEventListener("click", async () => {
  const replyContent = commentReplyBox.value;
  const res = await fetch(`/posts/${replyId}/comments`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId: auth.userId,
      postId: replyId,
      comment: replyContent,
    }),
  });

  commentReplyBox.value = "";

  crudUtils.populateReplyFeed("song", sort, null, replyFeedDiv, auth.userId, replyId);
});

topButton.addEventListener("click", () => {
  sort = "top";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateReplyFeed("song", sort, null, replyFeedDiv, auth.userId, replyId);
});

latestButton.addEventListener("click", () => {
  sort = "latest";
  crudUtils.updateSort(sort, topButton, latestButton);
  crudUtils.populateReplyFeed("song", sort, null, replyFeedDiv, auth.userId, replyId);
});

crudUtils.populatePostData(replyId, auth.userId, postTopDiv);
crudUtils.populateReplyFeed("song", sort, null, replyFeedDiv, auth.userId, replyId);
crudUtils.populateNavbarData(navProfilePicture, auth.userId);

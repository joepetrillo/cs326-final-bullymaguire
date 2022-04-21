const auth = JSON.parse(window.localStorage.getItem("auth"));

if (!auth) {
  window.location.href = "/login";
}

const replyId = window.location.pathname.split("/")[2];
const postTopDiv = document.getElementById("post-top");
const replyFeedDiv = document.getElementById("reply-feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const commentReplyToggle = document.getElementById("comment-box-tab");
const songReplyToggle = document.getElementById("reply-upload-tab");
const submitReplyButton = document.getElementById("reply-btn");
const commentReplyBox = document.getElementById("comment-reply-box");
const songReplyTitleBox = document.getElementById("reply-title-box");
const songReplyAudioBox = document.getElementById("reply-audio-box");
const userProfilePicture = document.getElementById("user-profile-picture");
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

  populateReplyFeed();
});

topButton.addEventListener("click", () => {
  updateSort("top");
});

latestButton.addEventListener("click", () => {
  updateSort("latest");
});

function updateSort(button) {
  if (button === "top") {
    topButton.classList.add("active");
    latestButton.classList.remove("active");
  } else if (button === "latest") {
    latestButton.classList.add("active");
    topButton.classList.remove("active");
  }

  sort = button;
  populateReplyFeed();
}

function updateFilter(button) {
  if (button === "all") {
    allButton.classList.add("active");
    songsButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (button === "songs") {
    songsButton.classList.add("active");
    allButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (button === "comments") {
    commentsButton.classList.add("active");
    songsButton.classList.remove("active");
    allButton.classList.remove("active");
  }

  filter = button;
  populateReplyFeed();
}

const populateBeatData = async () => {
  const replyRes = await fetch(`/posts/${replyId}`);
  const replyData = await replyRes.json();

  const parentRes = await fetch(`/posts/${replyData.parentId}`);
  const parentData = await parentRes.json();
  const parentTitle = parentData.title;
  const parentLink = `/beat/${parentData.postId}`;
  const parentTitleText = `created on ${parentTitle}`;

  const userRes = await fetch(`/users/${replyData.userId}`);
  const userData = await userRes.json();
  const userName = userData.username;
  const userPicture = userData.picture;

  const userLink = `/profile/${replyData.userId}`;

  let createdDateObj = new Date(replyData.created);
  let createdMonth = createdDateObj.getMonth();
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

  let buttonType = "bi-heart-pulse";

  if (replyData.likedBy.includes(auth.userId)) buttonType = "bi-heart-pulse-fill";

  let genre = replyData.genre;
  let genreId = "otherTag";

  switch (genre) {
    case "other":
      genreId = "otherTag";
      break;
    case "Hip-Hop":
      genreId = "hhTag";
      break;
    case "Pop":
      genreId = "popTag";
      break;
    case "EDM":
      genreId = "edmTag";
      break;
    case "Rock":
      genreId = "rockTag";
      break;
    case "Metal":
      genreId = "metalTag";
      break;
    case "Trap":
      genreId = "trapTag";
      break;
    default:
      genreId = "otherTag";
  }

  const postTop = `
  <!-- Profile picture -->
    <div class="post__profile">
      <a href="${userLink}">
        <img class="post__page__picture" src="${userPicture}" alt="user" />
      </a>
      <a href="">
        <p class="post__username">@${userName}</p>
      </a>
    </div>

    <!-- Title and Playback -->
    <div class="post__top__details">
      <div class="post__title">
        <h1>${replyData.title} </h1>
        <a href=${parentLink}>
          <h5>${parentTitleText}</h5>
        </a>
        <div class="heart__button">
          <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
          <span class="feed__genre badge rounded-pill" id="${genreId}">${genre}</span>
          <p>${replyData.likeCount}</p>
          <i class="like-button bi ${buttonType}" id="like-button"></i>
        </div>
      </div>
      <div class="post__playback mb-3">
        <audio controls preload="auto">
          <source src=${replyData.audio} type="audio/mp3" />
        </audio>
      </div>
    </div>
  `;

  postTopDiv.innerHTML += postTop;

  populateBeatLikeButton();
};

const populateBeatLikeButton = async () => {
  const likeButton = document.getElementById("like-button");

  likeButton.addEventListener("click", async () => {
    const updatePostRes = await fetch(`/posts/${replyId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ userId: auth.userId }),
    });

    const { likeCount } = await updatePostRes.json();

    if (updatePostRes.status !== 200) {
      return;
    }

    if (likeButton.classList.contains("bi-heart-pulse")) {
      likeButton.classList.remove("bi-heart-pulse");
      likeButton.classList.add("bi-heart-pulse-fill");
    } else if (likeButton.classList.contains("bi-heart-pulse-fill")) {
      likeButton.classList.remove("bi-heart-pulse-fill");
      likeButton.classList.add("bi-heart-pulse");
    }

    likeButton.previousElementSibling.innerHTML = likeCount;
  });
};

const populateReplyFeed = async () => {
  replyFeedDiv.innerHTML = "";

  const comments = await getBeatComments(sort);

  comments.forEach((currComment) => {
    replyFeedDiv.innerHTML += createCommentElement(currComment);
  });

  const commentLikeButtons = document.querySelectorAll(".comment-like-button");
  const songLikeButtons = document.querySelectorAll(".song-like-button");

  commentLikeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      const parentPostID = currLikeButton.parentElement.parentElement.parentElement.id;
      const commentId = currLikeButton.parentElement.parentElement.parentElement.parentElement.id;

      const updatePostRes = await fetch(`/posts/${parentPostID}/comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ userId: auth.userId }),
      });

      const { likeCount } = await updatePostRes.json();

      if (updatePostRes.status !== 200) {
        return;
      }

      if (currLikeButton.classList.contains("bi-heart-pulse")) {
        currLikeButton.classList.remove("bi-heart-pulse");
        currLikeButton.classList.add("bi-heart-pulse-fill");
      } else if (currLikeButton.classList.contains("bi-heart-pulse-fill")) {
        currLikeButton.classList.remove("bi-heart-pulse-fill");
        currLikeButton.classList.add("bi-heart-pulse");
      }

      currLikeButton.previousElementSibling.innerHTML = likeCount;
    });
  });

  songLikeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      const parentPostID = currLikeButton.parentElement.parentElement.parentElement.id;

      const updatePostRes = await fetch(`/posts/${parentPostID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ userId: auth.userId }),
      });

      const { likeCount } = await updatePostRes.json();

      if (updatePostRes.status !== 200) {
        return;
      }

      if (currLikeButton.classList.contains("bi-heart-pulse")) {
        currLikeButton.classList.remove("bi-heart-pulse");
        currLikeButton.classList.add("bi-heart-pulse-fill");
      } else if (currLikeButton.classList.contains("bi-heart-pulse-fill")) {
        currLikeButton.classList.remove("bi-heart-pulse-fill");
        currLikeButton.classList.add("bi-heart-pulse");
      }

      currLikeButton.previousElementSibling.innerHTML = likeCount;
    });
  });
};

const getBeatComments = async (sort, filter) => {
  let commentsUrl = `/posts/${replyId}/comments?sort=${sort}`;
  const commentsRes = await fetch(commentsUrl);
  const commentsData = await commentsRes.json();

  const data = await Promise.all(
    commentsData.map(async (currComment) => {
      // Get the user data
      const userUrl = `/users/${currComment.userId}`;
      const userRes = await fetch(userUrl);
      const userData = await userRes.json();
      const username = userData.username;
      const picture = userData.picture;

      return {
        ...currComment,
        username: username,
        picture: picture,
      };
    })
  );

  return data;
};

const createCommentElement = (data) => {
  const { commentId, userId, postId, comment, likeCount, likedBy, created, username, picture } = data;

  const userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";

  if (likedBy.includes(auth.userId)) buttonType = "bi-heart-pulse-fill";

  let createdDateObj = new Date(created);
  let createdMonth = createdDateObj.getMonth() + 1;
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

  const commentTemplate = `
    <div class="post__comment thread__comment__wrapper mb-2" id=${commentId}>
      <div class="thread__comment__main" id=${postId}>
        <div class="post__controls comment__controls">
          <div class="heart__button">
              <div class="like__count"><p>${likeCount}</p></div>
              <i class="comment-like-button bi ${buttonType}"></i>
          </div>
        </div>
        <a href=${userLink}>
          <img
            src=${picture}
            alt="user"
            width="30"
            height="30"
          />
        </a>
        <a href=${userLink}>
          <p class="post__username thread__reply__username">@${username}</p>
        </a>
        <div class="comment__content">
          <p class="thread__comment">${comment}</p>
          <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
        </div>
      </div>
    </div>
  `;

  return commentTemplate;
};

const getUserPosts = async (sort, filter) => {
  const postUrl = `/users/${profileUserId}/posts?sort=${sort}&filter=${filter}`;
  const postRes = await fetch(postUrl);
  const postData = await postRes.json();

  const data = await Promise.all(
    postData.map(async (currPost) => {
      // Get the user data
      const userUrl = `/users/${currPost.userId}`;
      const userRes = await fetch(userUrl);
      const userData = await userRes.json();
      const username = userData.username;
      const picture = userData.picture;

      // Get the comment data
      const commentUrl = `/posts/${currPost.postId}/comments?filter=comments&sort=top`;
      const commentRes = await fetch(commentUrl);
      const commentData = await commentRes.json();

      // Get the commenter's profile pictures
      let comments = commentData.slice(0, 3);

      comments = await Promise.all(
        comments.map(async (currComment) => {
          const commentPicUrl = `/users/${currComment.userId}`;
          const commentPicRes = await fetch(commentPicUrl);
          const commentPicData = await commentPicRes.json().then((pic) => pic.picture);

          return { ...currComment, picture: commentPicData };
        })
      );

      // Get the parent post title if exists
      let parentTitle = "";

      if (currPost.parentId) {
        const parentPostRes = await fetch(`/posts/${currPost.parentId}`);
        const parentPostData = await parentPostRes.json();
        parentTitle = parentPostData.title;
      }

      return {
        ...currPost,
        username: username,
        picture: picture,
        comments: comments,
        parentTitle: parentTitle,
      };
    })
  );

  return data;
};

const populateUserData = async () => {
  const userRes = await fetch(`/users/${auth.userId}`);
  const userData = await userRes.json();
  const username = userData.username;

  userProfilePicture.src = userData.picture;
};

populateBeatData();
populateReplyFeed();
populateUserData();

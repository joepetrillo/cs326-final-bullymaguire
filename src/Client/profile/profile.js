const auth = JSON.parse(window.localStorage.getItem("auth"));

if (!auth) {
  window.location.href = "/login";
}

const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const myProfileButton = document.getElementById("profile-button");
const profilePicture = document.getElementById("profile-picture");
const profileUsername = document.getElementById("profile-username");

const beatsButton = document.getElementById("beats-button");
const songsButton = document.getElementById("songs-button");
const commentsButton = document.getElementById("comments-button");

const globalUserId = JSON.parse(window.localStorage.getItem("auth")).userId;
const profileUserId = window.location.pathname.split("/")[2];

let sort = "top";
let filter = "beats";

myProfileButton.href = `/profile/${globalUserId}`;

topButton.addEventListener("click", () => {
  updateSort("top");
});

latestButton.addEventListener("click", () => {
  updateSort("latest");
});

beatsButton.addEventListener("click", (e) => {
  updateFilter("beats");
  e.preventDefault();
});

songsButton.addEventListener("click", () => {
  updateFilter("songs");
});

commentsButton.addEventListener("click", () => {
  updateFilter("comments");
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
  populateFeed();
}

function updateFilter(button) {
  if (button === "beats") {
    beatsButton.classList.add("active");
    songsButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (button === "songs") {
    songsButton.classList.add("active");
    beatsButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (button === "comments") {
    commentsButton.classList.add("active");
    songsButton.classList.remove("active");
    beatsButton.classList.remove("active");
  }

  filter = button;
  populateFeed();
}

function createPostElement(data) {
  const { audio, comments, postId, created, userId, likeCount, likedBy, genre, title, picture, username, parentId, parentTitle } = data;

  let postLink = `/beat/${postId}`;
  let parentLink = "";
  let userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";
  let genreId = "";
  let parentTitleText = "";

  let createdDateObj = new Date(created);
  let createdMonth = createdDateObj.getMonth();
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

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

  if (likedBy.includes(globalUserId)) buttonType = "bi-heart-pulse-fill";

  if (parentId) {
    postLink = `/song/${postId}`;
    parentTitleText = `recorded on ${parentTitle}`;
    parentLink = `/beat/${parentId}`;
  }

  const commentsTemplate = comments
    .map((currComment) => {
      return `<div class="post__comment mb-1">
            <img
              class="profilePicture__rounded comment__picture"
              src="${currComment.picture}"
              alt="user"
            />
            <p>${currComment.comment}</p>
        </div>`;
    })
    .join("");

  const postTemplate = `
      <div class="post mt-4" id=${postId}>
          <div class="post__top">
              <!-- Profile picture -->
              <div class="post__profile">
              <a href=${userLink}>
                  <img
                      class="profilePicture__rounded post__picture"
                      src="${picture}"
                      alt="user"
                  />
              </a>
                  <a href=${userLink}>
                      <p class="post__username">@${username}</p>
                  </a>
              </div>

              <!-- Title and Playback -->
              <div class="post__top__details">
                  <div class="post__title">
                      <a href=${postLink}>
                          <h3>${title}</h3>
                      </a>
                      <a href=${parentLink}>
                          <h5>${parentTitleText}</h5>
                      </a>
                      <div class="heart__button">
                          <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
                          <span class="feed__genre badge rounded-pill" id=${genreId}>${genre}</span>
                          <p>${likeCount}</p>
                          <i class="like-button bi ${buttonType} "></i>
                      </div>
                  </div>
                  <div class="post__playback mb-3">
                      <audio controls preload="auto">
                          <source src=${audio}  type="audio/mp3">
                      </audio>
                  </div>
              </div>
          </div>

          <!-- Comments -->
          <div class="post__comments mb-3">
              ${commentsTemplate}
          </div>
      </div>`;

  return postTemplate;
}

const createCommentElement = (data) => {
  const { commentId, userId, postId, comment, likeCount, likedBy, created, username, picture } = data;

  let buttonType = "bi-heart-pulse";

  if (likedBy.includes(globalUserId)) buttonType = "bi-heart-pulse-fill";

  const commentTemplate = `
    <div class="post__comment thread__comment__wrapper mb-1" id=${commentId}>
        <div class="thread__comment__main" id=${postId}>
            <div class="post__controls comment__controls">
                <div class="heart__button">
                    <p>${likeCount}</p>
                    <i class="like-button bi ${buttonType}"></i>
                </div>
            </div>
            <img
                class="profilePicture__rounded comment__picture"
                src=${picture}
                alt="user"
            />
            <p class="post__username thread__reply__username">@${username}</p>
            <p class="thread__comment">${comment}</p>
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

const getProfileComments = async (sort) => {
  const commentsUrl = `/users/${profileUserId}/comments?sort=${sort}`;
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

const populateFeed = async () => {
  feedDiv.innerHTML = "";

  if (filter === "beats" || filter === "songs") {
    const posts = await getUserPosts(sort, filter);
    posts.forEach((currPost) => {
      feedDiv.innerHTML += createPostElement(currPost);
    });
  }

  if (filter === "comments") {
    const comments = await getProfileComments(sort);
    comments.forEach((currComment) => {
      feedDiv.innerHTML += createCommentElement(currComment);
    });
  }

  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      let likeCount = 0;

      if (filter === "beats" || filter === "songs") {
        const parentPostID = currLikeButton.parentElement.parentElement.parentElement.parentElement.parentElement.id;

        const updatePostRes = await fetch(`/posts/${parentPostID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ userId: globalUserId }),
        });

        updateData = await updatePostRes.json();
        likeCount = updateData.likeCount;

        if (updatePostRes.status !== 200) {
          return;
        }
      }

      if (filter === "comments") {
        const postId = currLikeButton.parentElement.parentElement.parentElement.id;

        const commentId = currLikeButton.parentElement.parentElement.parentElement.parentElement.id;

        const updateCommentRes = await fetch(`/posts/${postId}/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ userId: globalUserId }),
        });
        console.log(updateCommentRes);

        updateData = await updateCommentRes.json();
        console.log(updateData);
        likeCount = updateData.likeCount;

        if (updateCommentRes.status !== 200) {
          return;
        }
      }

      if (currLikeButton.classList.contains("bi-heart-pulse")) {
        currLikeButton.classList.remove("bi-heart-pulse");
        currLikeButton.classList.add("bi-heart-pulse-fill");
      } else if (currLikeButton.classList.contains("bi-heart-pulse-fill")) {
        currLikeButton.classList.remove("bi-heart-pulse-fill");
        currLikeButton.classList.add("bi-heart-pulse");
      }

      console.log(currLikeButton.previousElementSibling);

      currLikeButton.previousElementSibling.innerHTML = likeCount;
    });
  });

  return;
};

const populateUserData = async () => {
  const userRes = await fetch(`/users/${profileUserId}`);
  const userData = await userRes.json();
  const username = userData.username;

  profileUsername.innerHTML = `@${username}`;
  profilePicture.src = userData.picture;
};

populateFeed();
populateUserData();

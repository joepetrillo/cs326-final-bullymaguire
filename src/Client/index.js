const auth = JSON.parse(window.localStorage.getItem("auth"));

if (!auth) {
  window.location.href = "/login";
}

const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const myProfileButton = document.getElementById("profile-button");
const userProfilePicture = document.getElementById("user-profile-picture");

let sort = "top";

topButton.addEventListener("click", () => {
  updateSort("top");
});

latestButton.addEventListener("click", () => {
  updateSort("latest");
});

myProfileButton.href = `/profile/${auth.userId}`;

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

  if (likedBy.includes(auth.userId)) buttonType = "bi-heart-pulse-fill";

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

const getPosts = async (sort) => {
  const postUrl = `/posts?sort=${sort}`;
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

const populateFeed = async () => {
  feedDiv.innerHTML = "";

  const posts = await getPosts(sort);
  posts.forEach((currPost) => {
    feedDiv.innerHTML += createPostElement(currPost);
  });

  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      const parentPostID = currLikeButton.parentElement.parentElement.parentElement.parentElement.parentElement.id;

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

  return;
};

const populateUserData = async () => {
  const userRes = await fetch(`/users/${auth.userId}`);
  const userData = await userRes.json();
  const username = userData.username;

  userProfilePicture.src = userData.picture;
};

populateFeed();
populateUserData();

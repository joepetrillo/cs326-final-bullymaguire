const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
const globalUserId = JSON.parse(window.localStorage.getItem("auth")).userId;

let sort = "top";

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
  populateFeed();
}

const singlePost = (data) => {
  const { audio, comments, postId, created, userId, likeCount, likedBy, genre, title, picture, username, parentId } = data;

  let postLink = `/beat/${postId}`;
  let userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";

  if (likedBy.includes(globalUserId)) {
    buttonType = "bi-heart-pulse-fill";
  }

  if (parentId) {
    postLink = `/song/${parentId}`;
  }

  const commentsTemplate = comments
    .map((currComment) => {
      return `<div class="post__comment mb-1">
          <img
            src="${currComment.picture}"
            alt="user"
            width="30"
            height="30"xs
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
                      src="${picture}"
                      alt="user"
                      width="60"
                      height="60"
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
                      <div class="heart__button">
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
};

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

      return {
        ...currPost,
        username: username,
        picture: picture,
        comments: comments,
      };
    })
  );

  return data;
};

const populateFeed = async () => {
  feedDiv.innerHTML = "";

  const posts = await getPosts(sort);
  posts.forEach((currPost) => {
    feedDiv.innerHTML += singlePost(currPost);
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
        body: JSON.stringify({ userId: globalUserId }),
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

populateFeed();

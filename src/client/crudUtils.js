// Functions used across client files to help with CRUD and API related operations

// Updates the sorting buttons on a page
export function updateSort(sort, topButton, latestButton) {
  if (sort === "top") {
    topButton.classList.add("active");
    latestButton.classList.remove("active");
  } else if (sort === "latest") {
    latestButton.classList.add("active");
    topButton.classList.remove("active");
  }
}

// Updates the filter buttons on a page
export function updateFilter(filter, firstButton, songsButton, commentsButton) {
  if (filter === "beats" || filter === "all") {
    firstButton.classList.add("active");
    songsButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (filter === "songs") {
    songsButton.classList.add("active");
    firstButton.classList.remove("active");
    commentsButton.classList.remove("active");
  } else if (filter === "comments") {
    commentsButton.classList.add("active");
    songsButton.classList.remove("active");
    firstButton.classList.remove("active");
  }
}

// Creates an HTML element containing a post for a feed
export function createPostElement(data, authId) {
  const { audio, comments, postId, created, userId, likeCount, likedBy, genre, title, picture, username, parentId, parentTitle } = data;

  let postLink = `/beat/${postId}`;
  let parentLink = "";
  let userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";
  let genreId = "";
  let parentTitleText = "";

  let createdDateObj = new Date(created);
  let createdMonth = createdDateObj.getMonth() + 1;
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

  if (likedBy.includes(authId)) buttonType = "bi-heart-pulse-fill";

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

  const deleteButton = `
      <div>
        <i class="bi bi-trash delete-button"></i>
      </div>
      `;

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
                          ${authId === userId ? deleteButton : "<div></div>"}
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

// Creates an HTML element containing a comment for a thread or profile
export function createCommentElement(data, authId) {
  const { commentId, userId, postId, comment, likeCount, likedBy, created, username, picture } = data;

  const userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";

  if (likedBy.includes(authId)) buttonType = "bi-heart-pulse-fill";

  let createdDateObj = new Date(created);
  let createdMonth = createdDateObj.getMonth() + 1;
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

  const deleteButton = `
    <div>
      <i class="bi bi-trash delete-button comment-delete"></i>
    </div>
    `;

  const commentTemplate = `
      <div class="post__comment thread__comment__wrapper mb-2" id=${commentId}>
        <div class="thread__comment__main" id=${postId}>
          <div class="post__controls comment__controls">
            <div class="heart__button">
                <div class="like__count"><p>${likeCount}</p></div>
                <i class="like-button comment-like bi ${buttonType}"></i>
            </div>
          </div>
          <a href=${userLink}>
            <img
              src=${picture}
              alt="user"
              class="comment__picture profilePicture__rounded"
            />
          </a>
          <a href=${userLink}>
            <p class="post__username thread__reply__username">@${username}</p>
          </a>
          <div class="comment__content">
            <p class="thread__comment">${comment}</p>
            <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
            
          </div>
          ${authId === userId ? deleteButton : "<div></div>"}
        </div>
      </div>
    `;

  return commentTemplate;
}

// Creates an HTML element containing a song reply for a thread
export function createSongElement(data, authId) {
  const { audio, comments, postId, created, userId, likeCount, likedBy, genre, title, picture, username, parentId, parentTitle } = data;

  let postLink = `/song/${postId}`;
  let userLink = `/profile/${userId}`;
  let buttonType = "bi-heart-pulse";

  if (likedBy.includes(authId)) buttonType = "bi-heart-pulse-fill";

  let createdDateObj = new Date(created);
  let createdMonth = createdDateObj.getMonth() + 1;
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

  const deleteButton = `
      <div>
        <i class="bi bi-trash delete-button song-delete"></i>
      </div>
      `;

  const commentTemplate = `
        <div class="post__comment thread__comment__wrapper mb-2" id=${postId}>
            <div class="thread__comment__main" id=${postId}>
                <div class="post__controls comment__controls">
                  <div class="heart__button">
                    <div class="like__count"><p>${likeCount}</p></div>
                    <i class="song-like-button bi ${buttonType}" id="song-like-button"></i>
                  </div>
                </div>
                <a href=${userLink}>
                  <img
                    src=${picture}
                    alt="user"
                    class="comment__picture profilePicture__rounded"
                  />
                </a>
                <a href=${userLink}>
                  <p class="post__username thread__reply__username">@${username}</p>
                </a>
                <div class="song__content">
                  <div class="song__content__main">
                    <a href=${postLink}>
                      <h4>${title}</h4>
                    </a>
                    <div class="post__playback thread__playback">
                      <audio controls preload="auto">
                          <source src=${audio}  type="audio/mp3">
                      </audio>
                    </div>
                  </div>
                  <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
                </div>
                ${authId === userId ? deleteButton : "<div></div>"}
            </div>
        </div>
      `;

  return commentTemplate;
}

// Gets posts from the API using the given parameters
export async function getPosts(sort, filter, type, userId) {
  let postUrl = `/posts?sort=${sort}`;
  if (type === "user") postUrl = `/users/${userId}/posts?sort=${sort}&filter=${filter}`;
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
}

// Gets comments from the API using the given parameters
export async function getComments(type, sort, filter, userId, postId) {
  let commentsUrl = `/users/${userId}/comments?sort=${sort}`;
  if (type === "post") {
    if (!filter || filter === "all") commentsUrl = `/posts/${postId}/comments?sort=${sort}`;
    else commentsUrl = `/posts/${postId}/comments?sort=${sort}&filter=${filter}`;
  }

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
}

// Populates the feed on the home page as well as profiles
export async function populateFeed(type, sort, filter, feedDiv, auth, profileUserId) {
  feedDiv.innerHTML = "";

  if (type === "index") {
    const posts = await getPosts(sort, null, "index", null);
    posts.forEach((currPost) => {
      feedDiv.innerHTML += createPostElement(currPost, auth);
    });
  }

  if (type === "profile") {
    if (filter === "beats" || filter === "songs") {
      const posts = await getPosts(sort, filter, "user", profileUserId);
      posts.forEach((currPost) => {
        feedDiv.innerHTML += createPostElement(currPost, auth);
      });
    }

    if (filter === "comments") {
      const comments = await getComments("user", sort, null, profileUserId, null);
      comments.forEach((currComment) => {
        feedDiv.innerHTML += createCommentElement(currComment, auth);
      });
    }
  }

  const likeButtons = document.querySelectorAll(".like-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(async (currDeleteButton) => {
    currDeleteButton.addEventListener("click", async () => {
      if (type === "index") {
        const parentPostID = currDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;

        const res = await fetch(`/posts/${parentPostID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        });

        if (res.status === 200) {
          populateFeed("index", sort, null, feedDiv, auth, null);
        }
      }

      if (type === "profile") {
        if (filter === "beats" || filter === "songs") {
          const parentPostID = currDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;

          const res = await fetch(`/posts/${parentPostID}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
          });

          if (res.status === 200) {
            populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
          }
        }

        if (filter === "comments") {
          const postId = currDeleteButton.parentElement.parentElement.id;

          const commentId = currDeleteButton.parentElement.parentElement.parentElement.id;

          const res = await fetch(`/posts/${postId}/comments/${commentId}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
          });

          if (res.status === 200) {
            populateFeed("profile", sort, filter, feedDiv, auth, profileUserId);
          }
        }
      }
    });
  });

  likeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      let likeCount = 0;

      if (type === "index") {
        const parentPostID = currLikeButton.parentElement.parentElement.parentElement.parentElement.parentElement.id;

        const updatePostRes = await fetch(`/posts/${parentPostID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ userId: auth }),
        });

        const updateData = await updatePostRes.json();
        likeCount = updateData.likeCount;

        if (updatePostRes.status !== 200) {
          return;
        }
      }

      if (type === "profile") {
        if (filter === "beats" || filter === "songs") {
          const parentPostID = currLikeButton.parentElement.parentElement.parentElement.parentElement.parentElement.id;

          const updatePostRes = await fetch(`/posts/${parentPostID}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({ userId: auth }),
          });

          const updateData = await updatePostRes.json();
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
            body: JSON.stringify({ userId: auth }),
          });

          const updateData = await updateCommentRes.json();
          likeCount = updateData.likeCount;

          if (updateCommentRes.status !== 200) {
            return;
          }
        }
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
}

// Populates the comments section on a thread
export async function populateReplyFeed(type, sort, filter, replyFeedDiv, auth, postId) {
  replyFeedDiv.innerHTML = "";

  const comments = await getComments("post", sort, filter, null, postId);

  comments.forEach((currComment) => {
    if (type === "beat") {
      if (currComment.commentId) {
        replyFeedDiv.innerHTML += createCommentElement(currComment, auth);
      } else {
        replyFeedDiv.innerHTML += createSongElement(currComment, auth);
      }
    }

    if (type === "song") {
      replyFeedDiv.innerHTML += createCommentElement(currComment, auth);
    }
  });

  const commentLikeButtons = document.querySelectorAll(".like-button");
  const songLikeButtons = document.querySelectorAll(".song-like-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(async (currDeleteButton) => {
    currDeleteButton.addEventListener("click", async () => {
      if (currDeleteButton.classList.contains("comment-delete")) {
        const parentPostID = currDeleteButton.parentElement.parentElement.id;
        const commentId = currDeleteButton.parentElement.parentElement.parentElement.id;

        const res = await fetch(`/posts/${parentPostID}/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        });

        if (res.status === 200) {
          populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, postId);
        }
      }

      if (currDeleteButton.classList.contains("song-delete")) {
        const parentPostID = currDeleteButton.parentElement.parentElement.id;

        const res = await fetch(`/posts/${parentPostID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        });

        if (res.status === 200) {
          populateReplyFeed("beat", sort, filter, replyFeedDiv, auth, postId);
        }
      }
    });
  });

  commentLikeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      if (currLikeButton.classList.contains("comment-like")) {
        const parentPostID = currLikeButton.parentElement.parentElement.parentElement.id;
        const commentId = currLikeButton.parentElement.parentElement.parentElement.parentElement.id;

        const updatePostRes = await fetch(`/posts/${parentPostID}/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ userId: auth }),
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
      }
    });
  });

  songLikeButtons.forEach(async (currLikeButton) => {
    currLikeButton.addEventListener("click", async () => {
      const parentPostID = currLikeButton.parentElement.parentElement.parentElement.id;
      console.log(parentPostID);

      const updatePostRes = await fetch(`/posts/${parentPostID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ userId: auth }),
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
}

// Populates the post data at the top of a beat/song page
export async function populatePostData(postId, authId, postTopDiv) {
  const beatRes = await fetch(`/posts/${postId}`);
  const beatData = await beatRes.json();

  let parentLink = "";
  let parentTitleText = "";

  if (beatData.parentId) {
    const parentRes = await fetch(`/posts/${beatData.parentId}`);
    const parentData = await parentRes.json();
    const parentTitle = parentData.title;
    parentLink = `/beat/${parentData.postId}`;
    parentTitleText = `recorded on ${parentTitle}`;
  }

  const userRes = await fetch(`/users/${beatData.userId}`);
  const userData = await userRes.json();
  const userName = userData.username;
  const userPicture = userData.picture;

  const userLink = `/profile/${beatData.userId}`;

  let createdDateObj = new Date(beatData.created);
  let createdMonth = createdDateObj.getMonth() + 1;
  let createdDate = createdDateObj.getDate();
  let createdYear = createdDateObj.getFullYear();

  let buttonType = "bi-heart-pulse";

  if (beatData.likedBy.includes(authId)) buttonType = "bi-heart-pulse-fill";

  let genre = beatData.genre;
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

  const deleteButtonDiv = `
    <div>
      <i class="bi bi-trash delete-button post-delete"></i>
    </div>
    `;

  const postTop = `
    <!-- Profile picture -->
      <div class="post__profile">
        <a href="${userLink}">
          <img class="post__picture profilePicture__rounded post__page__picture" src="${userPicture}" alt="user" />
        </a>
        <a href="">
          <p class="post__username">@${userName}</p>
        </a>
      </div>
  
      <!-- Title and Playback -->
      <div class="post__top__details">
        <div class="post__title">
          <h1>${beatData.title} </h1>
          <a href=${parentLink}>
            <h5>${parentTitleText}</h5>
          </a>
          <div class="heart__button">
            <h6>${createdMonth}/${createdDate}/${createdYear}</h6>
            <span class="feed__genre badge rounded-pill" id="${genreId}">${genre}</span>
            <p>${beatData.likeCount}</p>
            <i class="like-button bi ${buttonType}" id="like-button"></i>
            ${authId === userData.userId ? deleteButtonDiv : "<div></div>"}
          </div>
        </div>
        <div class="post__playback mb-3">
          <audio controls preload="auto">
            <source src=${beatData.audio} type="audio/mp3" />
          </audio>
        </div>
      </div>
    `;

  postTopDiv.innerHTML += postTop;

  const likeButton = document.getElementById("like-button");

  likeButton.addEventListener("click", async () => {
    const updatePostRes = await fetch(`/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ userId: authId }),
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

  const deleteButton = document.getElementsByClassName("post-delete")[0];
  if (!deleteButton) {
    return;
  }

  deleteButton.addEventListener("click", async () => {
    const res = await fetch(`/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (res.status === 200) {
      window.location.href = "/";
    }
  });
}

// Populates the logged in user's profile picture in the navbar
export async function populateNavbarData(navProfilePicture, authId) {
  const userRes = await fetch(`/users/${authId}`);
  const userData = await userRes.json();

  navProfilePicture.src = userData.picture;
}

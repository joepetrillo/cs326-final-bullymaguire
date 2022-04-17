const singlePost = (data) => {
  const { audio, comments, postId, created, userId, likedCount, genre, title, picture, username } = data;

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

  const html = `
    <div class="post mb-4">
        <div class="post__top">
            <!-- Profile picture -->
            <div class="post__profile">
                <img
                    src="${picture}"
                    alt="user"
                    width="60"
                    height="60"
                />
                <p class="post__username">@${username}</p>
            </div>
        
            <!-- Title and Playback -->
            <div class="post__top__details">
                <h3 class="post__title">${title}</h3>
                <div class="post__playback mb-3">
                    <button class="btn btn-primary" type="button">
                        <i class="bi bi-play-fill"></i>
                    </button>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                </div>
            </div>
        </div>
        
        <!-- Comments -->
        <div class="post__comments mb-3">
            ${commentsTemplate}
        </div>

        <!-- Controls -->
          <div class="post__controls">
            <div class="btn-group w-100 mb-3" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary btn-controls">Like +</button>
              <button type="button" class="btn btn-primary btn-controls">Dislike -</button>
              <button type="button" class="btn btn-primary btn-controls">Share -></button>
              <button type="button" class="btn btn-primary btn-controls">Comments ''</button>
            </div>
          </div>
    </div>`;

  return html;
};

const feedDiv = document.getElementById("feed");
const topButton = document.getElementById("top-button");
const latestButton = document.getElementById("latest-button");
let sort = topButton.classList.contains("active") ? "top" : "latest";

topButton.addEventListener("click", () => {});

latestButton.addEventListener("click", () => {});

// const makePost = async (data) => {
//   const { audio, comments, postId, created, userId, likedCount, genre, title } = data;

//   //   // MAIN POST DIV
//   //   let postDiv = document.createElement("div");
//   //   postDiv.classList.add("post", "mb-4");

//   //     // POST TOP DIV
//   //   let postTopDiv = document.createElement("div");
//   //   postTopDiv.classList.add("post__top")

//   //   let postProfileDiv = document.createElement("div");
//   //   postProfileDiv.classList.add("post__profile")
// };

const appendChildren = (node, arr) => {
  arr.forEach((p) => node.appendChild(p));
};

const populateFeed = async () => {
  let posts = await getPosts(sort);
  posts.forEach((currPost) => {
    feedDiv.innerHTML += singlePost(currPost);
  });

  // get consutrcted DOM posts from makePost and add to page
  //   appendChildren(feedDiv, DOMPosts);

  return;
};

const getPosts = async (sort) => {
  const postUrl = `/posts?sort=${sort}`;

  const postRes = await fetch(postUrl);
  const postData = await postRes.json();

  let data = await Promise.all(
    postData.map(async (currPost) => {
      // get user data
      const userUrl = `/users/${currPost.userId}`;
      const userRes = await fetch(userUrl);
      const userData = await userRes.json();
      const username = userData.username;
      const picture = userData.picture;

      // get comments
      const commentUrl = `/posts/${currPost.postId}/comments?filter=comments&sort=top`;
      const commentRes = await fetch(commentUrl);
      const commentData = await commentRes.json();

      // get comment profile pictures
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

  console.log(data);

  return data;
};

populateFeed();

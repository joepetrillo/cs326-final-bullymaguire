import { comments, users, posts } from "./persistence.js";

// Main POST CRUD
export function createPost({ userId, title, genre, audio, parentId }) {
  const newPost = {
    postId: Date.now().toString(),
    userId: userId,
    title: title,
    genre: genre,
    audio: audio,
    parentId: parentId,
    likeCount: 0,
    likedBy: [],
    created: new Date(),
  };

  posts.push(newPost);

  return newPost;
}

export function createComment({ ...props }) {
  return;
}

export function getPost(postId) {
  return posts.find((post) => post.postId === postId);
}

export function getFeedPosts(sort) {
  if (sort === "latest") {
    const latestPosts = posts.sort((a, b) => b.created - a.created);

    return latestPosts;
  }

  if (sort === "top") {
    const topPosts = posts.sort((a, b) => b.likeCount - a.likeCount);

    return topPosts;
  }
}

export function getPostComments({ ...props }) {
  return;
}

export function updateComment({ ...props }) {
  return;
}

export function updatePost({ ...props }) {
  return;
}

export function deletePost({ ...props }) {
  return;
}

export function deleteComment({ ...props }) {
  return;
}

// Crud Helpers
// check is post exists given a postId
export function checkPostExists(postId) {
  return posts.find((post) => post.postId === postId) !== undefined ? true : false;
}

// validate post data
export function checkPostData(data) {
  const { userId, title, genre, audio, parentId } = data;

  // check if all required fields are present
  if (userId === undefined || title === undefined || genre === undefined || audio === undefined || parentId === undefined) {
    return { isValid: false, error: "body is missing required fields" };
  }

  // check if the title is already being used by another post
  if (!posts.every((post) => post.title !== title)) {
    return { isValid: false, error: "title is already taken" };
  }

  return { isValid: true, error: null };
}

export function checkCommentExists({ ...props }) {
  return;
}

export function checkCommentData({ ...props }) {
  return;
}

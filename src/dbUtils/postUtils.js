import { comments, users, posts } from "./persistence.js";
import { checkUserExists } from "./userUtils.js";

// Main CRUD
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

export function createComment({ userId, postId, comment }) {
  const newComment = {
    commentId: Date.now().toString(),
    userId: userId,
    postId: postId,
    comment: comment,
    likeCount: 0,
    likedBy: [],
    created: new Date("2022-04-14T09:48:55.064Z"),
  };

  comments.push(newComment);

  return newComment;
}

export function getPost(postId) {
  return posts.find((post) => post.postId === postId);
}

export function getComment(commentId) {
  return comments.find((comment) => comment.commentId === commentId);
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

export function getPostComments(filter, sort, postId) {
  let ret = [];

  if (filter === "comments") {
    ret = comments.filter((c) => c.postId === postId);
  } else if (filter === "songs") {
    ret = posts.filter((p) => p.parentId === postId);
  } else if (!filter) {
    ret = [...posts.filter((p) => p.parentId === postId), ...comments.filter((c) => c.postId === postId)];
  }

  const topSort = (a, b) => b.likeCount - a.likeCount;
  const latestSort = (a, b) => b.created - a.created;

  return ret.sort(sort === "top" ? topSort : latestSort);
}

export function deletePost(postId) {
  posts.splice(
    posts.findIndex((p) => p.postId === postId),
    1
  );
}

export function deleteComment(commentId) {
  comments.splice(
    comments.findIndex((c) => c.commentId === commentId),
    1
  );
}

// CRUD Helpers
// checks if a post exists given a postId
export function checkPostExists(postId) {
  return posts.find((post) => post.postId === postId) !== undefined ? true : false;
}

// checks if a comment exists given a commentId
export function checkCommentExists(commentId) {
  return comments.find((comment) => comment.commentId === commentId) !== undefined ? true : false;
}

// validate new post data
export function checkNewPostData(data) {
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

// validate new comment data
export function checkCommentData({ userId, postId, comment }) {
  // check if all required fields are present
  let error = { isValid: true, error: null };
  if (!userId || !postId || !comment) {
    error = { isValid: false, error: "body is missing required fields" };
  }

  if (!checkPostExists(postId) || !checkUserExists(userId)) {
    error = { isValid: false, error: "postId or userId does not exist" };
  }

  // check if the email or username is already being used by an existing user
  if (comment === "") {
    error = { isValid: false, error: "can not comment empty string" };
  }

  return error;
}

// updates like count of post or comment
export function updateLikes(userId, updateId, isComment) {
  // update logic for increasing or decreasing like count
  const updateItem = isComment ? getComment(updateId) : getPost(updateId);

  if (updateItem.likedBy.includes(userId)) {
    updateItem.likeCount--;
    updateItem.likedBy.splice(updateItem.likedBy.indexOf(userId), 1);
  } else {
    updateItem.likeCount++;
    updateItem.likedBy.push(userId);
  }

  return updateItem.likeCount;
}

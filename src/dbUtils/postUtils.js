import { connection } from "./connection.js";
// import { comments, users, posts } from "./persistence.js";
import { checkUserExists } from "./userUtils.js";

const { connect, close } = await connection();
const DB = await connect();
const COMMENTS = DB.collection("comments");
const POSTS = DB.collection("posts");

// Main CRUD
export async function createPost({ userId, title, genre, audio, parentId }) {
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

  await POSTS.insertOne(newPost);

  return newPost;
}

export async function createComment({ userId, postId, comment }) {
  const newComment = {
    commentId: Date.now().toString(),
    userId: userId,
    postId: postId,
    comment: comment,
    likeCount: 0,
    likedBy: [],
    created: new Date(),
  };

  await COMMENTS.insertOne(newComment);

  return newComment;
}

export async function getPost(postId) {
  return await POSTS.findOne({ postId: postId });
}

export async function getComment(commentId) {
  // return comments.find((comment) => comment.commentId === commentId);
  return await COMMENTS.findOne({ commentId: commentId });
}

export async function getFeedPosts(sort) {
  let allPosts = await POSTS.find({}).toArray();

  if (sort === "latest") {
    const latestPosts = allPosts.sort((a, b) => b.created - a.created);

    return latestPosts;
  }

  if (sort === "top") {
    const topPosts = allPosts.sort((a, b) => b.likeCount - a.likeCount);

    return topPosts;
  }
}

export async function getPostComments(filter, sort, postId) {
  let ret = [];

  const getByPostId = async (coll, property) => {
    return await coll.find({ [property]: postId }).toArray();
  };

  if (filter === "comments") {
    ret = await getByPostId(COMMENTS, "postId");
  } else if (filter === "songs") {
    ret = await getByPostId(POSTS, "parentId");
  } else if (!filter) {
    ret = [...(await getByPostId(POSTS, "parentId")), ...(await getByPostId(COMMENTS, "postId"))];
  }

  const topSort = (a, b) => b.likeCount - a.likeCount;
  const latestSort = (a, b) => b.created - a.created;

  return ret.sort(sort === "top" ? topSort : latestSort);
}

export async function deletePost(postId) {
  await POSTS.deleteOne({ postId: postId });
}

export async function deleteComment(commentId) {
  await COMMENTS.deleteOne({ commentId: commentId });
}

// CRUD Helpers
// checks if a post exists given a postId
export async function checkPostExists(postId) {
  let post = await getPost(postId);
  return post !== null;
  // return posts.find((post) => post.postId === postId) !== undefined ? true : false;
}

// checks if a comment exists given a commentId
export async function checkCommentExists(commentId) {
  let comment = await getComment(commentId);
  return comment !== null;
  // return comments.find((comment) => comment.commentId === commentId) !== undefined ? true : false;
}

// validate new post data
export async function checkNewPostData(data) {
  const { userId, title, genre, audio, parentId } = data;

  // check if all required fields are present
  if (userId === undefined || title === undefined || genre === undefined || audio === undefined || parentId === undefined) {
    return { isValid: false, error: "body is missing required fields" };
  }

  // check if the title is already being used by another post
  const allPosts = await POSTS.find({ title: title }).toArray();
  if (allPosts.length !== 0) {
    return { isValid: false, error: "title is already taken" };
  }

  return { isValid: true, error: null };
}

// validate new comment data
export async function checkCommentData({ userId, postId, comment }) {
  // check if all required fields are present
  let error = { isValid: true, error: null };
  if (!userId || !postId || !comment) {
    error = { isValid: false, error: "body is missing required fields" };
  }

  if (!(await checkPostExists(postId)) || !(await checkUserExists(userId))) {
    error = { isValid: false, error: "postId or userId does not exist" };
  }

  // check if the email or username is already being used by an existing user
  if (comment === "") {
    error = { isValid: false, error: "can not comment empty string" };
  }

  return error;
}

// updates like count of post or comment
export async function updateLikes(userId, updateId, isComment) {
  // update logic for increasing or decreasing like count
  const updateItem = isComment ? getComment : getPost;
  const idToUpdate = isComment ? "commentId" : "postId";
  const updateCollection = isComment ? COMMENTS : POSTS;

  const { likedBy, likeCount } = await updateItem(updateId);
  const valDelta = likedBy.includes(userId) ? -1 : 1;
  const arrayDelta = likedBy.includes(userId) ? { $pull: { likedBy: userId } } : { $push: { likedBy: userId } };

  await updateCollection.updateOne({ [idToUpdate]: updateId }, { $inc: { likeCount: valDelta }, ...arrayDelta });
  return likeCount + valDelta;
}

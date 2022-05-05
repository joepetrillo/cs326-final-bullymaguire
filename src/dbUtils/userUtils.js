import { connection } from "./connection.js";
// import { comments, users, posts } from "./persistence.js";

const { connect, close } = await connection();
const DB = await connect();
const USERS = DB.collection("users");
const COMMENTS = DB.collection("comments");
const POSTS = DB.collection("posts");

// Main CRUD
export async function createUser({ email, username, password }) {
  const newUser = {
    userId: Date.now().toString(),
    email: email,
    username: username,
    password: password,
    picture: "https://cdn.discordapp.com/attachments/941059461764751420/971186943272550450/unknown.png",
  };

  await USERS.insertOne(newUser);
  return newUser;
}

export async function getUser(userId) {
  return await USERS.findOne({ userId: userId });
}

export async function getUserComments(userId, sort) {
  const userComments = await COMMENTS.find({ userId: userId }).toArray();

  const topSort = (a, b) => b.likeCount - a.likeCount;

  const latestSort = (a, b) => b.created - a.created;

  return userComments.sort(sort === "top" ? topSort : latestSort);
}

export async function getUserPosts(userId, sort, filter) {
  // TODO: REMOVE
  // const userPosts = posts.filter((p) => p.userId === userId);
  const userPosts = await POSTS.find({ userId: userId }).toArray();

  let ret = [];

  if (filter === "beats") {
    ret = userPosts.filter((p) => p.parentId === null);
  } else if (filter === "songs") {
    ret = userPosts.filter((p) => p.parentId !== null);
  } else if (!filter) {
    ret = userPosts;
  }

  const topSort = (a, b) => b.likeCount - a.likeCount;
  const latestSort = (a, b) => b.created - a.created;

  return ret.sort(sort === "top" ? topSort : latestSort);
}

export async function updateUser(userId, { type, email, password, picture }) {
  const updateField = async (field, value) => {
    await USERS.updateOne({ userId: userId }, { $set: { [field]: value } });
  };

  if (type === "email") {
    updateField("email", email);
  } else if (type === "password") {
    updateField("password", password);
  } else if (type === "picture") {
    updateField("picture", picture);
  }
  return await getUser(userId);
}

// TODO: COME BACK
export async function deleteUser(userId) {
  await USERS.deleteOne({ userId: userId });
  // await POSTS.deleteOne({ userId: userId });
  // await COMMENTS.deleteOne({ userId: userId });
}

// CRUD Helpers
// checks if a user exists given an userId
export async function checkUserExists(userId) {
  let user = await getUser(userId);
  return user !== null;
}

// validate sign up data
export async function checkSignUpData(data) {
  const { email, username, password, confirm } = data;

  // check if all required fields are present
  if (email === undefined || username === undefined || password === undefined || confirm === undefined) {
    return { isValid: false, error: "body is missing required fields" };
  }

  // check if passwords match
  if (password !== confirm) {
    return { isValid: false, error: "passwords do not match" };
  }

  // check if the email or username is already being used by an existing user
  if (!users.every((user) => user.email !== email && user.username !== username)) {
    return { isValid: false, error: "email or username already being used" };
  }

  return { isValid: true, error: null };
}

// validate update data
export async function checkUpdateData(data) {
  const { type, email, password, confirm, picture } = data;

  // check if all required fields are present
  if (type === undefined || email === undefined || password === undefined || confirm === undefined || picture === undefined) {
    return { isValid: false, error: "body is missing required fields" };
  }

  // ensure no fields are null if being updated
  if ((type === "email" && email === null) || (type === "password" && password === null) || (type === "picture" && picture === null)) {
    return { isValid: false, error: "the field being updated cannot be null" };
  }

  // check if passwords match
  if (password !== confirm) {
    return { isValid: false, error: "passwords do not match" };
  }

  return { isValid: true, error: null };
}

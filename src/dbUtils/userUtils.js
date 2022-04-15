import { comments, users, posts } from "./persistence.js";

// Main CRUD
export function createUser({ email, username, password }) {
  const newUser = {
    userId: Date.now().toString(),
    email: email,
    username: username,
    password: password,
    picture: "default profile picture url",
  };

  users.push(newUser);

  return newUser;
}

export function getUser(userId) {
  return users.find((user) => user.userId === userId);
}

export function getUserComments(userId) {
  return comments.filter((c) => c.userId == userId);
}

export function getUserPosts(userId) {
  return posts.filter((p) => p.userId === userId);
}

export function updateUser(userId, { type, email, password, picture }) {
  const user = users[getUserIndex(userId)];

  if (type === "email") {
    user.email = email;
  } else if (type === "password") {
    user.password = password;
  } else if (req.body.type === "picture") {
    user.picture = picture;
  }
  return user;
}

export function deleteUser(userId) {
  users.splice(
    users.findIndex((u) => u.userId === userId),
    1
  );
}

// CRUD Helpers
// checks if a user exists given an userId
export function checkUserExists(userId) {
  return users.find((user) => user.userId === userId) !== undefined ? true : false;
}

// get the index of a user given an userId
export function getUserIndex(userId) {
  return users.findIndex((user) => user.userId === userId);
}

// validate sign up data
export function checkSignUpData(data) {
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
export function checkUpdateData(data) {
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

import express from "express";
import logger from "morgan";
import { comments, users, posts } from "./crudUtils/persistence.js";

const router = express.Router();

function deleteUser(userId) {
  users.splice(
    users.findIndex((u) => u.id === userId),
    1
  );
}

function getUserComments(userId) {
  return comments.filter((c) => c.userId == userId);
}

const getUserPosts = (userId) => posts.filter((p) => p.userId === userId);
// checks if a user exists given an userId
function checkUserExists(userId) {
  return users.find((user) => user.id === userId) !== undefined ? true : false;
}

// validate sign up data
function checkSignUpData(data) {
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
function checkUpdateData(data) {
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

// get the index of a user given an userId
function getUserIndex(userId) {
  return users.findIndex((user) => user.id === userId);
}

// CREATE user
router.post("/", (req, res) => {
  try {
    const check = checkSignUpData(req.body);
    if (check.isValid) {
      const newUser = {
        id: Date.now().toString(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        picture: "default profile picture url",
      };
      users.push(newUser);
      res.json(newUser);
    } else {
      res.status(400).json({ error: check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ user
router.get("/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    if (checkUserExists(userId)) {
      res.json(users.find((user) => user.id === userId));
    } else {
      res.status(400).json({ error: `no users with the id ${userId} exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// UPDATE user
router.put("/:userId", (req, res) => {
  try {
    const check = checkUpdateData(req.body);
    const userId = req.params.userId;
    if (check.isValid && checkUserExists(userId)) {
      const user = users[getUserIndex(userId)];
      if (req.body.type === "email") {
        user.email = req.body.email;
      } else if (req.body.type === "password") {
        user.password = req.body.password;
      } else if (req.body.type === "picture") {
        user.picture = req.body.picture;
      }
      res.json({ success: `successfully updated the ${req.body.type} of user ${userId}` });
    } else {
      res.status(400).json({ error: check.error === null ? `no users with the id ${userId} exist` : check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE user
router.delete("/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    if (checkUserExists(userId)) {
      deleteUser(userId);
      res.json({ success: `successfully deleted user ${userId}` });
    } else {
      res.status(400).json({ error: `no users with the id ${userId} exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ user comments
router.get("/:userId/comments", (req, res) => {
  try {
    const userId = req.params.userId;
    if (checkUserExists(userId)) {
      res.status(200).json(getUserComments(userId));
    } else {
      res.status(400).json({ error: `no users with the id ${userId} exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ user posts
router.get("/:userId/posts", (req, res) => {
  const { userId } = req.params;
  try {
    if (!checkUserExists(userId)) {
      return res.status(400).json({ error: `no users with the id ${userId} exist` });
    }

    res.json(getUserPosts(userId));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;

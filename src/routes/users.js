import express from "express";
import logger from "morgan";

const router = express.Router();

function checkSignUpData(data) {
  return { isValid: false };
}

function makeUser(email, username, password) {
  return {
    email: email,
    username: username,
    password: password,
  };
}

function checkUserExists(userId) {
  return users.find((u) => u.id === userId) !== undefined ? true : false;
}

function deleteUser(userId) {
  users.splice(
    users.findIndex((u) => u.id === userId),
    1
  );
}

function getUserComments(userId) {
  return comments.filter((c) => c.userId == userId);
}

let users = [
  {
    id: "497861819",
    username: "username",
    email: "123@gmail.com",
    password: "password",
    profilePicLink: "www.image.com",
  },
];

let comments = [
  {
    commentId: 497855427,
    userId: 497861819,
    postId: 747855476,
    comment: "this is a comment by 497861819",
  },
  {
    commentId: 497855428,
    userId: 497861819,
    postId: 747855476,
    comment: "this is another comment by 497861819",
  },
  {
    commentId: 497855428,
    userId: 497855411,
    postId: 747855476,
    comment: "this is another comment",
  },
];

router.post("/", (req, res) => {
  try {
    let { email, username, password, confirm } = req.body;

    // Validate user data. If the email or username is already taken, or the passwords don't match, throw an error
    const status = checkSignUpData({ email, username, password, confirm });

    if (status.isValid) {
      return res.status(400).json({ error: status.error });
    }

    users.push({ id: Date.now().toString().slice(2, 11), username: username, email: email, password: password, profilePicLink: "www.image.com" });

    res.json(makeUser(email, username, password));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.get("/:userId", (req, res) => {
  res.send("Get User");
});

router.put("/:userId", (req, res) => {
  res.send("Update User");
});

router.delete("/:userId", (req, res) => {
  try {
    const userId = req.params.userId;

    if (checkUserExists(userId)) {
      deleteUser(userId);

      res.json({ success: `Successfully deleted the user with id ${userId}` });
    } else {
      res.status(400).json({ error: `user with id ${userId} does not exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

//comments
router.get("/:userId/comments", (req, res) => {
  try {
    const userId = req.params.userId;

    if (checkUserExists(userId)) {
      const userComments = getUserComments(userId);

      res.status(200).json(userComments);
    } else {
      res.status(400).json({ error: `user with id ${userId} does not exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

//posts
router.get("/userId/posts", (req, res) => {
  res.send("Get User Posts");
});

export default router;

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
router.post("/", (req, res) => {
  res.send("Create User");
  try {
    let { email, username, password, confirm } = req.body;

    // if not email or not username or passwords dont match send error
    const status = checkSignUpData(email, username, password, confirm);

    if (!status.isValid) {
      return res.status(400).json({ error: status.error });
    }
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
  res.send("Delete User");
});
//comments
router.get("/userId/comments", (req, res) => {
  res.send("Get User Comments");
});
//posts
router.get("/userId/posts", (req, res) => {
  res.send("Get User Posts");
});

export default router;

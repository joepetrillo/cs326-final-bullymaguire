import express from "express";
import * as utils from "../dbUtils/userUtils.js";

const router = express.Router();

const missingUserError = (id) => `no users with the id ${id} exist`;

// CREATE user
router.post("/", (req, res) => {
  try {
    const check = utils.checkSignUpData(req.body);

    if (check.isValid) {
      res.json(utils.createUser(req.body));
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

    if (utils.checkUserExists(userId)) {
      res.json(utils.getUser(userId));
    } else {
      res.status(400).json({ error: missingUserError(userId) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// UPDATE user
router.put("/:userId", (req, res) => {
  try {
    const check = utils.checkUpdateData(req.body);
    const userId = req.params.userId;

    if (check.isValid && utils.checkUserExists(userId)) {
      utils.updateUser(userId, req.body);
      res.json({ success: `successfully updated the ${req.body.type} of user ${userId}` });
    } else {
      res.status(400).json({ error: check.error === null ? missingUserError(userId) : check.error });
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

    if (utils.checkUserExists(userId)) {
      utils.deleteUser(userId);
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

    if (utils.checkUserExists(userId)) {
      res.status(200).json(utils.getUserComments(userId));
    } else {
      res.status(400).json({ error: missingUserError(userId) });
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
    if (!utils.checkUserExists(userId)) {
      return res.status(400).json({ error: missingUserError(userId) });
    }

    res.json(utils.getUserPosts(userId));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;

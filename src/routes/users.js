import express from "express";
import * as utils from "../dbUtils/userUtils.js";

const router = express.Router();

const missingUserError = (id) => `no users with the id ${id} exist`;

// CREATE user
router.post("/", async (req, res) => {
  try {
    const check = await utils.checkSignUpData(req.body);

    if (check.isValid) {
      res.json(await utils.createUser(req.body));
    } else {
      res.status(400).json({ error: check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (await utils.checkUserExists(userId)) {
      res.json(await utils.getUser(userId));
    } else {
      res.status(400).json({ error: missingUserError(userId) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// UPDATE user
router.put("/:userId", async (req, res) => {
  try {
    const check = await utils.checkUpdateData(req.body);
    const userId = req.params.userId;

    if (check.isValid && (await utils.checkUserExists(userId))) {
      await utils.updateUser(userId, req.body);
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
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (await utils.checkUserExists(userId)) {
      console.log(await utils.checkUserExists(userId));
      await utils.deleteUser(userId);
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
router.get("/:userId/comments", async (req, res) => {
  try {
    const userId = req.params.userId;
    const sort = req.query.sort;

    if (await utils.checkUserExists(userId)) {
      res.status(200).json(await utils.getUserComments(userId, sort));
    } else {
      res.status(400).json({ error: missingUserError(userId) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ user posts
router.get("/:userId/posts", async (req, res) => {
  const { userId } = req.params;
  const { sort, filter } = req.query;

  try {
    if (!(await utils.checkUserExists(userId))) {
      return res.status(400).json({ error: missingUserError(userId) });
    }

    if (!sort || (sort !== "top" && sort !== "latest")) {
      res.status(400).json({ error: "Incorrect query parameter" });
    }

    res.status(200).json(await utils.getUserPosts(userId, sort, filter));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;

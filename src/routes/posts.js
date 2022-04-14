import express from "express";
import * as utils from "../dbUtils/postUtils.js";

const router = express.Router();

// POST create post
router.post("/", (req, res) => {
  try {
    const check = utils.checkPostData(req.body);

    if (check.isValid) {
      res.status(200).json(utils.createPost(req.body));
    } else {
      res.status(400).json({ error: check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// GET read feed posts
router.get("/", (req, res) => {
  try {
    const filter = req.query.filter;

    if (filter === undefined) {
      res.status(400).json({ error: "Incorrect query parameter" });
    }

    if (filter !== "latest" && filter !== "top") {
      res.status(400).json({ error: `filter ${filter} does not exist` });
    }

    res.status(200).json(utils.getFeedPosts(filter));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// GET read specific post
router.get("/:postId", (req, res) => {
  try {
    const postId = req.params.postId;

    if (utils.checkPostExists(postId)) {
      res.status(200).json(utils.getPost(postId));
    } else {
      res.status(400).json({ error: `no post with id ${postId} exists` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// PUT update posts

// DEL delete posts

// POST create comment

// GET read post comments

// PUT update comment

// DEL delete comment

export default router;

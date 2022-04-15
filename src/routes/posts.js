import express from "express";
import * as utils from "../dbUtils/postUtils.js";

const router = express.Router();

// CREATE post
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

// READ posts
router.get("/", (req, res) => {
  try {
    const sort = req.query.sort;

    if (sort === undefined) {
      res.status(400).json({ error: "Incorrect query parameter" });
    }

    if (sort !== "latest" && sort !== "top") {
      res.status(400).json({ error: `filter ${sort} does not exist` });
    }

    res.status(200).json(utils.getFeedPosts(sort));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ specfic post
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

// UPDATE post
router.put("/:postId", (req, res) => {
  try {
    const check = utils.checkPostData(req.body); //maybe a checkUpdateData instead?
    const postId = req.params.postId;

    if (check.isValid && utils.checkPostExists(postId)) {
      utils.updatePost(postId, req.body);
      res.status(200).json({ success: `successfully updated the ${req.body.type} of post ${postId}` });
    } else {
      res.status(400).json({ error: check.error === null ? `no post with id ${postId} exists` : check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE post
router.delete("/:postId", (req, res) => {
  try {
    const postId = req.params.postId;

    if (utils.checkPostExists(postId)) {
      utils.deletePost(postId);
      res.status(200).json({ success: `successfully deleted the post ${postId}` });
    } else {
      res.status(400).json({ error: `no post with id ${postId} exists` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// CREATE post comment
router.post("/:postId/comments", (req, res) => {
  let check = utils.checkCommentData(req.body);
  if (!check.isValid) {
    return res.status(400).json({ error: check.error });
  }

  res.json(utils.createComment(req.body));
});

// READ post comments
router.get("/:postId/comments", (req, res) => {
  if (!sortType || sortType !== "top" || sortType !== "latest") {
    return res.json({ error: "sortType invalid or not given" });
  }

  const { sortType, filterType } = req.query;
  const { postId } = req.params;
  let ret = [];

  if (filterType === "comments") {
    ret = getAllComments(postId);
  } else if (filterType === "posts") {
    ret = getAllPosts(postId);
  } else if (!filterType) {
    ret = [...getAllPosts, ...getAllComments];
  }

  const topSort = (a, b) => b.likeCount - a.likeCount;
  const latestSort = (a, b) => b.created - a.created;

  res.json(ret.sort(sortType === "top" ? topSort : latestSort));
});

// UPDATE post comment
router.put("/:postId/comments/:commentId", (req, res) => {});

// DELETE post comment
router.delete("/:postId/comments/:commentId", (req, res) => {});

export default router;

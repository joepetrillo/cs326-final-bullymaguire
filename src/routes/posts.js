import express from "express";
import * as utils from "../dbUtils/postUtils.js";
import { checkUserExists } from "../dbUtils/userUtils.js";

const router = express.Router();

// CREATE post
router.post("/", (req, res) => {
  try {
    const check = utils.checkNewPostData(req.body);

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
    const check = utils.checkUpdatePostData(req.body); //maybe a checkUpdateData instead?
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
  const { sortType, filterType } = req.query;
  const { postId } = req.params;

  if (!sortType || sortType !== "top" || sortType !== "latest") {
    return res.json({ error: "sortType invalid or not given" });
  }

  const postComments = utils.getPostComments(filterType, sortType, postId);

  res.json(postComments);
});

// UPDATE post comment
router.put("/:postId/comments/:commentId", (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    // check if post, comment and user exist before update
    if (utils.checkUserExists(userId) && utils.checkPostExists(postId) && utils.checkCommentExists(commentId)) {
      utils.updateLikes(userId, commentId, true);
      res.json({ success: `successfully updated the like count of comment ${commentId}` });
    } else {
      res.status(400).json({ error: "user, post or comment id given does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE post comment
router.delete("/:postId/comments/:commentId", (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    // check if post and comment exist before trying to delete
    if (utils.checkPostExists(postId) && utils.checkCommentExists(commentId)) {
      utils.deleteComment(commentId);
      res.json({ success: `successfully deleted comment ${commentId}` });
    } else {
      res.status(400).json({ error: "post or comment id given does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;

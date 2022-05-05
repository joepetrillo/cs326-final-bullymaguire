import express from "express";
import * as utils from "../dbUtils/postUtils.js";
import { checkUserExists } from "../dbUtils/userUtils.js";

const router = express.Router();

// CREATE post
router.post("/", async (req, res) => {
  try {
    const check = await utils.checkNewPostData(req.body);

    if (check.isValid) {
      res.status(200).json(await utils.createPost(req.body));
    } else {
      res.status(400).json({ error: check.error });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ posts
router.get("/", async (req, res) => {
  try {
    const sort = req.query.sort;

    if (sort === undefined) {
      res.status(400).json({ error: "Incorrect query parameter" });
    }

    if (sort !== "latest" && sort !== "top") {
      res.status(400).json({ error: `filter ${sort} does not exist` });
    }

    res.status(200).json(await utils.getFeedPosts(sort));
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// READ specfic post
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    if (await utils.checkPostExists(postId)) {
      res.status(200).json(await utils.getPost(postId));
    } else {
      res.status(400).json({ error: `no post with id ${postId} exists` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// UPDATE post
router.put("/:postId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;

    // check if post, comment and user exist before update
    if ((await checkUserExists(userId)) && (await utils.checkPostExists(postId))) {
      const newLikeCount = await utils.updateLikes(userId, postId, false);
      res.status(200).json({ success: `successfully updated the like count of post ${postId}`, likeCount: newLikeCount });
    } else {
      res.status(400).json({ error: "post or user id given does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE post
router.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    if (await utils.checkPostExists(postId)) {
      await utils.deletePost(postId);
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
router.post("/:postId/comments", async (req, res) => {
  let check = await utils.checkCommentData(req.body);
  if (!check.isValid) {
    return res.status(400).json({ error: check.error });
  }

  res.json(await utils.createComment(req.body));
});

// READ post comments
router.get("/:postId/comments", async (req, res) => {
  const { sort, filter } = req.query;
  const { postId } = req.params;

  if (!sort || (sort !== "top" && sort !== "latest")) {
    return res.json({ error: "sortType invalid or not given" });
  }

  const postComments = await utils.getPostComments(filter, sort, postId);

  res.json(postComments);
});

// UPDATE post comment
router.put("/:postId/comments/:commentId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    // check if post, comment and user exist before update
    if ((await checkUserExists(userId)) && (await utils.checkPostExists(postId)) && (await utils.checkCommentExists(commentId))) {
      const likeCount = await utils.updateLikes(userId, commentId, true);
      res.json({ success: `successfully updated the like count of comment ${commentId}`, likeCount: likeCount });
    } else {
      res.status(400).json({ error: "user, post or comment id given does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE post comment
router.delete("/:postId/comments/:commentId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    // check if post and comment exist before trying to delete
    if ((await utils.checkPostExists(postId)) && (await utils.checkCommentExists(commentId))) {
      await utils.deleteComment(commentId);
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

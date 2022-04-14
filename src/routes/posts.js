import express from "express";
import * as utils from "../dbUtils/postUtils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("root posts working");
});

// POST create post

// GET read feed posts

// GET read specific post

// PUT update posts

// DEL delete posts

// POST create comment

// GET read post comments

// PUT update comment

// DEL delete comment

export default router;

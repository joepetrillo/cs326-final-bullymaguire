import express from "express";
import logger from "morgan";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users");
});

export default router;

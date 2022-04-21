import express from "express";
import logger from "morgan";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use("/beat/", express.static("./client/beat"));
app.use("/beat/", express.static("./img"));

app.get("/beat/:postId", (req, res) => {
  res.sendFile("./client/beat/", { root: "./" });
});

app.use("/song/", express.static("./client/song"));
app.use("/song/", express.static("./img"));

app.get("/song/:postId", (req, res) => {
  res.sendFile("./client/song/", { root: "./" });
});

app.use("/profile/", express.static("./client/profile"));
app.use("/profile/", express.static("./img"));

app.get("/profile/:userId", (req, res) => {
  res.sendFile("./client/profile/", { root: "./" });
});

app.use(express.static("./client"));
app.use(express.static("./img"));

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

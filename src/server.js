import express from "express";
// import logger from "morgan";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use("/beat/", express.static("./src/client/beat"));
app.get("/beat/:postId", (req, res) => {
  res.sendFile("./src/client/beat/", { root: "./" });
});

app.use("/song/", express.static("./src/client/song"));
app.get("/song/:postId", (req, res) => {
  res.sendFile("./src/client/song/", { root: "./" });
});

app.use("/profile/", express.static("./src/client/profile"));
app.get("/profile/:userId", (req, res) => {
  res.sendFile("./src/client/profile/", { root: "./" });
});

app.use(express.static("./src/client"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

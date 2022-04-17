import express from "express";
import logger from "morgan";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();

app.use(logger("dev"));
app.use(express.static("./src/Client"));
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

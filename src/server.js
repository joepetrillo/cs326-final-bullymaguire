import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

import expressSession from "express-session";
import auth from "./auth.js";

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || "SECRET",
  resave: false,
  saveUninitialized: false,
};

// Our own middleware to check if the user is authenticated
function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

const app = express();

app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
auth.configure(app);

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use("/beat/", checkLoggedIn, express.static("./src/client/beat"));
app.get("/beat/:postId", (req, res) => {
  res.sendFile("./src/client/beat/", { root: "./" });
});

app.use("/song/", checkLoggedIn, express.static("./src/client/song"));
app.get("/song/:postId", (req, res) => {
  res.sendFile("./src/client/song/", { root: "./" });
});

app.use("/profile/", checkLoggedIn, express.static("./src/client/profile"));
app.get("/profile/:userId", (req, res) => {
  res.sendFile("./src/client/profile/", { root: "./" });
});

app.use("/login/", express.static("./src/client/login"));

app.use(express.static("./src/client"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

import expressSession from "express-session";
import auth from "./auth.js";

const sessionConfig = {
  secret: process.env.SECRET || "SECRET",
  resave: false,
  saveUninitialized: true,
};

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.cookie("auth", req.user.userId, {
      httpOnly: false,
      sameSite: "strict",
    });
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

app.use("/beat/", express.static("./src/client/beat"));
app.get("/beat/:postId", checkLoggedIn, (req, res) => {
  res.sendFile("./src/client/beat/", { root: "./" });
});

app.use("/song/", express.static("./src/client/song"));
app.get("/song/:postId", checkLoggedIn, (req, res) => {
  res.sendFile("./src/client/song/", { root: "./" });
});

app.use("/profile/", express.static("./src/client/profile"));
app.get("/profile/:userId", checkLoggedIn, (req, res) => {
  res.sendFile("./src/client/profile/", { root: "./" });
});

app.use("/login/", express.static("./src/client/login"));

app.post(
  "/login",
  auth.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.cookie("auth", req.user.userId, {
      httpOnly: false,
      sameSite: "strict",
    });
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/", checkLoggedIn);
app.use(express.static("./src/client"), checkLoggedIn);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

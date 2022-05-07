import passport from "passport";
import passportLocal from "passport-local";
import * as utils from "./dbUtils/userUtils.js";

const { Strategy } = passportLocal;

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using email and
// password credentials from the client. The LocalStrategy object is used to
// authenticate a user using a email and password.
const strategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await utils.getUserByEmail(email);
    if (!user) {
      // no such user
      return done(null, false, { message: "Wrong email" });
    }
    if (password !== user.password) {
      // invalid passwordpassword
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, { message: "Wrong password" });
    }
    // success!
    // should create a user object here, associated with a unique identifier
    return done(null, user);
  }
);

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a email and
// password. There are other strategies available, but this is the simplest.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user.userId);
});

// Convert a unique identifier to a user object.
passport.deserializeUser(async (userId, done) => {
  const user = await utils.getUser(userId);
  done(null, user);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};

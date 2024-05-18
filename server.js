const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const database = require("./database/connect");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  ) // Basic express session initialization
  .use(passport.initialize()) // init passport on every route call
  .use(passport.session()); // allow passport to use "express-session"

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }));

app.use("/", require("./routes/"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findorCreate({ githubId: profile.id}, function (err, user) {
      return done(null, profile);
      //});
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

/* app.get("/", (req, res) => {
  
}); */

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Handling Errors fn
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.status(500).send(`The was an error at ${req.originalUrl}`);
});

database.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Database connected and Web Server listening at port ${port}`);
  }
});

/* app.listen(port, () => {
  console.log(`Database connected and Web Server listening at port ${port}`);
});
 */

const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  // #swagger.tags=["Welcome"]
  //res.send("Welcome to Project 2 for CSE341");
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/agents", require("./agents"));

router.use("/properties", require("./properties"));

module.exports = router;

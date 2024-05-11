const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  // #swagger.tags=["Welcome to Project 2 for CSE341"]
  res.send("Welcome to Project 2 for CSE341");
});

router.use("/agents", require("./agents"));

router.use("/properties", require("./properties"));

module.exports = router;

const express = require("express");
const router = express.Router();
//const validator = require("../validator");
//const utilities = require("../utilities/utilities");

const agentController = require("../controllers/agents");

router.get("/", agentController.getAllAgents);

router.get("/:id", agentController.getSingleAgent);

router.post("/", agentController.createAgent);
/*
router.put("/:id", agentController.updateAgent);

router.delete("/:id", agentController.deleteAgent); */

module.exports = router;

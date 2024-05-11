const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const utilities = require("../utilities/utilities");

const agentController = require("../controllers/agents");

router.get("/", utilities.handleErrors(agentController.getAllAgents));

router.get("/:id", utilities.handleErrors(agentController.getSingleAgent));

router.post(
  "/",
  validator.agentValidator(),
  validator.validateAgent,
  utilities.handleErrors(agentController.createAgent)
);

router.put(
  "/:id",
  validator.agentValidator(),
  validator.validateAgent,
  utilities.handleErrors(agentController.updateAgent)
);

router.delete("/:id", utilities.handleErrors(agentController.deleteAgent));

module.exports = router;

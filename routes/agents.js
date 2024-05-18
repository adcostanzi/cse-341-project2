const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const utilities = require("../utilities/utilities");
const auth = require("../utilities/authenticate");

const agentController = require("../controllers/agents");

router.get("/", utilities.handleErrors(agentController.getAllAgents));

router.get("/:id", utilities.handleErrors(agentController.getSingleAgent));

router.post(
  "/",
  auth.isAthenticated,
  validator.agentValidator(),
  validator.validateAgent,
  utilities.handleErrors(agentController.createAgent)
);

router.put(
  "/:id",
  auth.isAthenticated,
  validator.agentValidator(),
  validator.validateAgent,
  utilities.handleErrors(agentController.updateAgent)
);

router.delete(
  "/:id",
  auth.isAthenticated,
  utilities.handleErrors(agentController.deleteAgent)
);

module.exports = router;

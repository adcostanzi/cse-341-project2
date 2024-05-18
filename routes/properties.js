const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const utilities = require("../utilities/utilities");
const auth = require("../utilities/authenticate");

const propertyController = require("../controllers/properties");

router.get("/", utilities.handleErrors(propertyController.getAllProperties));

router.get(
  "/:id",
  utilities.handleErrors(propertyController.getSingleProperty)
);

router.post(
  "/",
  auth.isAthenticated,
  validator.propertyValidator(),
  validator.validateProperty,
  utilities.handleErrors(propertyController.uploadProperty)
);

router.put(
  "/:id",
  auth.isAthenticated,
  validator.propertyValidator(),
  validator.validateProperty,
  utilities.handleErrors(propertyController.updateProperty)
);

router.delete(
  "/:id",
  auth.isAthenticated,
  utilities.handleErrors(propertyController.deleteProperty)
);

module.exports = router;

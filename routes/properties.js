const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const utilities = require("../utilities/utilities");

const propertyController = require("../controllers/properties");

router.get("/", utilities.handleErrors(propertyController.getAllProperties));

router.get(
  "/:id",
  utilities.handleErrors(propertyController.getSingleProperty)
);

router.post(
  "/",
  validator.propertyValidator(),
  validator.validateProperty,
  utilities.handleErrors(propertyController.uploadProperty)
);

router.put(
  "/:id",
  validator.propertyValidator(),
  validator.validateProperty,
  utilities.handleErrors(propertyController.updateProperty)
);

router.delete(
  "/:id",
  utilities.handleErrors(propertyController.deleteProperty)
);

module.exports = router;

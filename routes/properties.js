const express = require("express");
const router = express.Router();
//const validator = require("../validator");
//const utilities = require("../utilities/utilities");

const propertyController = require("../controllers/properties");

router.get("/", propertyController.getAllProperties);

router.get("/:id", propertyController.getSingleProperty);

router.post("/", propertyController.uploadProperty);
/*
router.put("/:id", propertyController.updateProperty);

router.delete("/:id", propertyController.deleteProperty);
 */
module.exports = router;

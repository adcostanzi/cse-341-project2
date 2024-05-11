const { body, validationResult } = require("express-validator");

const propertyValidator = () => {
  return [
    body("title", "A title is required").not().isEmpty(),
    body("description", "A description is required").not().isEmpty(),
    body(
      "description",
      "Description length must not exceed 150 characters"
    ).isLength({ max: 150 }),
    body("address", "Please provide a valid address").not().isEmpty(),
    body("price", "Price is required").not().isEmpty(),
    body("price", "Price must be numeric").isNumeric(),
    body("bedrooms", "At least 1 Bedroom is required").not().isEmpty(),
    body("bedrooms", "Bedroom field must be numeric").isNumeric(),
    body("bathrooms", "At least 1 Bathroom is required").not().isEmpty(),
    body("bathrooms", "Bathroom field must be numeric").isNumeric(),
    body("square_footage", "Square footage is required").not().isEmpty(),
    body("square_footage", "Square footage must be numeric").isNumeric(),
  ];
};

const validateProperty = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorList = [];
  errors.array().map((err) => errorList.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: errorList,
  });
};

const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
const licenseNumberRegex = /^[A-Z]{3}\d{5}$/;

const agentValidator = () => {
  return [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please provide a valid email").isEmail().normalizeEmail(),
    body(
      "phone_number",
      "Please enter a valid phone number with format XXX-XXX-XXXX"
    ).matches(phoneNumberRegex),
    body("agency", "An agency is required").not().isEmpty(),
    body(
      "license_number",
      "Please enter a valid license number (3 capital letters and 5 numbers)"
    ).matches(licenseNumberRegex),
    body("specialty", "Specialty is required").not().isEmpty(),
  ];
};

const validateAgent = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorList = [];
  errors.array().map((err) => errorList.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: errorList,
  });
};

module.exports = {
  propertyValidator,
  validateProperty,
  agentValidator,
  validateAgent,
};

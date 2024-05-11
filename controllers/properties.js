const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  square_footage: Number,
});

const propertyModel = mongoose.model(
  "properties",
  propertySchema,
  "properties"
);

const getAllProperties = async (req, res) => {
  // #swagger.tags=["Properties"]
  propertyModel
    .find({})
    .then(function (properties) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(properties);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const getSingleProperty = async (req, res) => {
  // #swagger.tags=["Properties"]
  const propertyId = req.params.id;
  propertyModel
    .find({ _id: propertyId })
    .then(function (properties) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(properties);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const uploadProperty = async (req, res) => {
  // #swagger.tags=["Properties"]
  const toAddProperty = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    square_footage: req.body.square_footage,
  };

  const newProperty = new propertyModel(toAddProperty);
  newProperty
    .save()
    .then(() => {
      console.log("Property added to the database");
    })
    .catch((err) => {
      console.error("Error saving property:", err);
    });
  res.send(newProperty);
};

module.exports = { getAllProperties, getSingleProperty, uploadProperty };

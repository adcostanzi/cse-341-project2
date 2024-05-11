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

  try {
    const property = await propertyModel.find({ _id: propertyId });

    if (!property[0]) {
      return res.status(404).send("Property not found!");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(property[0]);
  } catch (err) {
    console.log("Error while trying to get property: ", err);
    res.status(500).send("Server Error");
  }
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
      res.status(201).send(newProperty);
    })
    .catch((err) => {
      console.log("Error saving property:", err);
    });
};

const updateProperty = async (req, res) => {
  // #swagger.tags=["Properties"]
  const propertyId = req.params.id;
  const update = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    square_footage: req.body.square_footage,
  };
  try {
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      propertyId,
      update,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).send("Property not found!");
    }
    console.log("Property Updated!");
    res.status(200).send(updatedProperty);
  } catch (err) {
    console.log("Error updating property:", err);
    res.status(500).send("Server Error");
  }
};

const deleteProperty = async (req, res) => {
  // #swagger.tags=["Properties"]
  const propertyId = req.params.id;

  try {
    const deletedProperty = await propertyModel.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).send("Property not found!");
    }
    console.log("Property has been sucessfully deleted!");
    res.status(204).send();
  } catch (err) {
    console.log("Error trying to delete property:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllProperties,
  getSingleProperty,
  uploadProperty,
  updateProperty,
  deleteProperty,
};

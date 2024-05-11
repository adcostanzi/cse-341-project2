const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
  agency: String,
  license_number: String,
  specialty: String,
});

const agentModel = mongoose.model("agents", agentSchema, "agents");

const getAllAgents = async (req, res) => {
  // #swagger.tags=["Agents"]
  agentModel
    .find({})
    .then(function (agents) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(agents);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const getSingleAgent = async (req, res) => {
  // #swagger.tags=["Agents"]
  const agentId = req.params.id;
  agentModel
    .find({ _id: agentId })
    .then(function (agents) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(agents);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const createAgent = async (req, res) => {
  // #swagger.tags=["Agents"]
  const toAddAgent = {
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    agency: req.body.agency,
    license_number: req.body.license_number,
    specialty: req.body.specialty,
  };

  const newAgent = new agentModel(toAddAgent);
  newAgent
    .save()
    .then(() => {
      console.log("Agent added to the database");
    })
    .catch((err) => {
      console.error("Error saving agent:", err);
    });
  res.send(newAgent);
};

module.exports = { getAllAgents, getSingleAgent, createAgent };

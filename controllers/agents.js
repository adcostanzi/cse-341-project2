const mongoose = require("mongoose");

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

  try {
    const agent = await agentModel.find({ _id: agentId });

    if (!agent[0]) {
      return res.status(404).send("Agent not found!");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(agent[0]);
  } catch (err) {
    console.log("Error while trying to get agent: ", err);
    res.status(500).send("Server Error");
  }
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
      res.status(201).send(newAgent);
    })
    .catch((err) => {
      console.log("Error saving agent:", err);
      res.status(500).send("Server Error");
    });
};

const updateAgent = async (req, res) => {
  // #swagger.tags=["Agents"]
  const agentId = req.params.id;
  const update = {
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    agency: req.body.agency,
    license_number: req.body.license_number,
    specialty: req.body.specialty,
  };

  try {
    const newAgent = await agentModel.findByIdAndUpdate(agentId, update, {
      new: true,
    });

    if (!newAgent) {
      return res.status(404).send("Agent not found!");
    }
    console.log("Agent Updated!");
    res.status(200).send(newAgent);
  } catch (err) {
    console.log("Error updating agent:", err);
    res.status(500).send("Server Error");
  }
};

const deleteAgent = async (req, res) => {
  // #swagger.tags=["Agents"]
  const agentId = req.params.id;

  try {
    const deletedAgent = await agentModel.findByIdAndDelete(agentId);

    if (!deletedAgent) {
      return res.status(404).send("Agent not found!");
    }
    console.log("Agent has been sucessfully deleted!");
    res.status(204).send();
  } catch (err) {
    console.log("Error trying to delete agent: ", err);
    res.status(500).send("Server Error");
  }
};

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
  agency: String,
  license_number: String,
  specialty: String,
});

const agentModel = mongoose.model("agents", agentSchema, "agents");

module.exports = {
  getAllAgents,
  getSingleAgent,
  createAgent,
  updateAgent,
  deleteAgent,
};

const mongoose = require("mongoose");

let database;

const initDB = (callback) => {
  if (database) {
    console.log("Database already initialized");
    return callback(null, database);
  }
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!database) {
    throw Error("Database has not been initialized!");
  }
  return database;
};

module.exports = { initDB, getDB };

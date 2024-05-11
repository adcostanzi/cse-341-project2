const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE341 - Project 2",
    description: "Project 2 for CSE-341 by Andres Costanzi",
  },
  host: "cse-341-project2-7eud.onrender.com",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);

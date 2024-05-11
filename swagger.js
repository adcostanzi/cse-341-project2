const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE341 - Project 2",
    description: "By Andres Costanzi",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger.json";
const routes = ["./routes/index"];

swaggerAutogen(outputFile, routes, doc);

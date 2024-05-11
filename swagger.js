const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE341 - Project 2",
    description: "By Andres Costanzi",
  },
  host: "http://cse-341-project2-7eud.onrender.com/",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index"];

swaggerAutogen(outputFile, routes, doc);

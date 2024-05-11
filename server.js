const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const database = require("./database/connect");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", require("./routes/"));

database.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Database connected and Web Server listening at port ${port}`);
  }
});

/* app.listen(port, () => {
  console.log(`Database connected and Web Server listening at port ${port}`);
});
 */

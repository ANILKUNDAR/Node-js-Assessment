require("dotenv").config();

const express = require("express");
const app = express();

const config = require("./config/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet')
const utils = require("./utils/utils");


const port = process.env.PORT || config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(helmet())
app.use('/docs', express.static(__dirname + '/apidoc/'));

app.use(morgan("tiny"));

require("./config/loader")(app, mongoose, utils);

app.get("/healthcheck", (req, res) => {
  res.status(200).send({
    status: "running succesfully"
  })
})

app.listen(port, () => {
  console.log(`listening on PORT ${port}`);
});
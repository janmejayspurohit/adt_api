const express = require("express");
const cors = require("cors");
const rootRoutes = require("./src/routes");
const { responseConverter, responseHandler } = require("./src/middleware/response");
const ApiError = require("./src/helpers/ApiError");
const httpStatus = require("http-status");

require("./db/sequelize");

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/", rootRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(responseConverter);

// response handler
app.use(responseHandler);

module.exports = app;

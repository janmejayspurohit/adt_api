const sequelize = require("sequelize");
const httpStatus = require("http-status");
const AppResponse = require("./AppResponse");
const ApiError = require("../helpers/ApiError");

const responseConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError || error instanceof AppResponse)) {
    const statusCode = error.statusCode || error instanceof sequelize.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const responseHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const hasError = !err.success;
  if (process.env === "production" && hasError && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  let response = {
    code: statusCode,
    message,
  };
  if (process.env === "development" && hasError) {
    response.stack = err.stack;
    console.error(err);
  } else {
    response = {
      ...response,
      ...err,
    };
  }
  res.status(statusCode).send(response);
};

module.exports = {
  responseConverter,
  responseHandler,
};

/* eslint-disable max-classes-per-file */
/* eslint-disable default-param-last */
const HTTPS_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

class HttpError extends Error {
  constructor({ message, name, statusCode, data }) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    Error.captureStackTrace(this, HttpError);
  }
}

class HttpBadRequest extends HttpError {
  constructor(message = "Bad request", data) {
    super({
      message,
      name: "HTTP_BAD_REQUEST",
      statusCode: HTTPS_STATUS_CODES.BAD_REQUEST,
      data,
    });
  }
}

class HttpNotFound extends HttpError {
  constructor(message = "Not Found", data) {
    super({
      message,
      name: "HTTP_NOT_FOUND",
      statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
      data,
    });
  }
}

class HttpInternalServerError extends HttpError {
  constructor(message = "Internal server error", data) {
    super({
      message,
      name: "HTTP_INTERNAL_SERVER_ERROR",
      statusCode: HTTPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
      data,
    });
  }
}

class HttpUnAuthorized extends HttpError {
  constructor(message = "Un Authorized", data) {
    super({
      message,
      name: "HTTP_UNAUTHORIZED",
      statusCode: HTTPS_STATUS_CODES.UNAUTHORIZED,
      data,
    });
  }
}

class HttpUnProcessableEntity extends HttpError {
  constructor(message = "Unprocessable Entity", data) {
    super({
      message,
      name: "HTTP_UNPROCESSABLE_ENTITY",
      statusCode: HTTPS_STATUS_CODES.UNPROCESSABLE_ENTITY,
      data,
    });
  }
}
class HttpForbidden extends HttpError {
  constructor(message = "REQUEST FORBIDDEN", data) {
    super({
      message,
      name: "HTTP_REQUEST_FORBIDDEN",
      statusCode: HTTPS_STATUS_CODES.FORBIDDEN,
      data,
    });
  }
}

module.exports = {
  HttpError,
  HttpBadRequest,
  HttpNotFound,
  HttpInternalServerError,
  HttpUnAuthorized,
  HttpUnProcessableEntity,
  HttpForbidden,
};

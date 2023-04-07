class AppResponse {
  constructor({ data = {}, code = 1000, statusCode = 200, message = "SUCCESS" }) {
    this.success = true;
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return this;
  }
}
module.exports = AppResponse;

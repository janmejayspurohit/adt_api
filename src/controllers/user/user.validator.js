const Joi = require("joi");

const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

const changePassword = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

const register = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

module.exports = {
  getOtherUserProfile,
  changePassword,
  register,
  login,
};

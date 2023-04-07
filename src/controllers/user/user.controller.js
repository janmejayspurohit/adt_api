const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../../../db/models");
const { uniqueId } = require("../../helpers");
const { hashPassword } = require("../../helpers/password");
const { HttpBadRequest } = require("../../helpers/http.error");
const AppResponse = require("../../middleware/AppResponse");
const catchAsync = require("../../helpers/catchAsync");
const ApiError = require("../../helpers/ApiError");
const httpStatus = require("http-status");

const register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new HttpBadRequest("User already exists with same email");
  }
  const encryptedPassword = await hashPassword(password);
  const payload = {
    email,
    firstName,
    lastName,
    password: encryptedPassword,
    isVerified: false,
    verifyToken: uniqueId(),
  };

  const newUser = await User.create(payload);
  next(new AppResponse({ data: newUser }));
};

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.scope("withSecretColumns").findOne({
    where: { email },
  });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email or password");
  }
  delete user.dataValues.password;
  const token = jwt.sign(
    {
      user: {
        userId: user.id,
        email: user.email,
        createdAt: new Date(),
      },
    },
    process.env.SECRET
  );
  const data = { user, token };
  next(new AppResponse({ data }));
});

// const profile = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const user = await User.findOne({ where: { id: userId } });
//     return successResponse(req, res, { user });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const user = await User.scope("withSecretColumns").findOne({
//       where: { id: userId },
//     });
//     const reqPass = await hashPassword(req.body.oldPassword);
//     if (reqPass !== user.password) {
//       throw new Error("Old password is incorrect");
//     }

//     const newPass = await hashPassword(req.body.newPassword);

//     await User.update({ password: newPass }, { where: { id: user.id } });
//     return successResponse(req, res, {});
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

module.exports = {
  login,
  register,
};

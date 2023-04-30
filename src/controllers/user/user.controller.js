const jwt = require("jsonwebtoken");
const { User } = require("../../../db/models");
const { uniqueId } = require("../../helpers");
const { hashPassword } = require("../../helpers/password");
const { HttpBadRequest } = require("../../helpers/http.error");
const AppResponse = require("../../middleware/AppResponse");
const catchAsync = require("../../helpers/catchAsync");
const ApiError = require("../../helpers/ApiError");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res, next) => {
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
});

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

const changePassword = catchAsync(async (req, res, next) => {
  const newPass = await hashPassword(req.body.newPassword);
  await User.update({ password: newPass }, { where: { email: req.body.email } });
  next(new AppResponse({ data: { message: "Password changed successfully" } }));
});

const allUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    order: [["createdAt", "DESC"]],
  });
  next(new AppResponse({ data: users }));
});

const updateUsers = catchAsync(async (req, res, next) => {
  const body = req.body;
  body.users.map(async (user) => {
    await User.update({ isAdmin: user.isAdmin }, { where: { id: user.id } });
  });
  next(new AppResponse({ data: { message: "Users updated successfully" } }));
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  next(new AppResponse({ data: { message: "User deleted successfully" } }));
});

module.exports = {
  login,
  register,
  changePassword,
  allUsers,
  updateUsers,
  deleteUser,
};

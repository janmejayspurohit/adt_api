const jwt = require("jsonwebtoken");
const { HttpBadRequest } = require("../helpers/http.error");

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers["x-token"])) {
    throw new HttpBadRequest("Token is not provided");
  }
  const token = req.headers["x-token"];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const user = await User.scope("withSecretColumns").findOne({
      where: { email: req.user.email },
    });
    if (!user) {
      throw new HttpBadRequest("User is not found in system");
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    throw new HttpBadRequest("Incorrect token is provided, try re-login");
  }
};
module.exports = apiAuth;

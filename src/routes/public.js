const express = require("express");
const validate = require("../middleware/validate");

const userController = require("../controllers/user/user.controller");
const userValidator = require("../controllers/user/user.validator");

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post("/login", validate(userValidator.login), userController.login);
router.post("/register", validate(userValidator.register), userController.register);
router.post("/forgotPassword", validate(userValidator.changePassword), userController.changePassword);

module.exports = router;

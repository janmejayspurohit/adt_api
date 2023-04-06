import express from "express";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import validate from "../middleware/validate";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get("/me", userController.profile);
router.post("/changePassword", validate(userValidator.changePassword), userController.changePassword);

module.exports = router;

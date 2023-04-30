const express = require("express");

const router = express.Router();
const userController = require("../controllers/user/user.controller");

//= ===============================
// Admin routes
//= ===============================
router.get("/allUsers", userController.allUsers);
router.post("/allUsers", userController.updateUsers);
router.delete("/allUsers/:id", userController.deleteUser);

module.exports = router;

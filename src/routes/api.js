const express = require("express");

const router = express.Router();

const dataController = require("../controllers/user/data.controller");

//= ===============================
// API routes
//= ===============================
router.get("/report1", dataController.report1);

module.exports = router;

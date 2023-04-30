const express = require("express");

const router = express.Router();

const dataController = require("../controllers/user/data.controller");

//= ===============================
// API routes
//= ===============================
router.get("/report1", dataController.report1);
router.get("/report2", dataController.report2);
router.get("/report3", dataController.report3);
router.post("/newData", dataController.newData);

module.exports = router;

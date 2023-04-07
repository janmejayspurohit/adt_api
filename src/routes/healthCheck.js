const express = require("express");

const router = express.Router();

//= ===============================
// HealthCheck routes
//= ===============================
router.get("/", (req, res) =>
  res.json({
    message: "Backend API - 👋🌎",
  })
);
module.exports = router;

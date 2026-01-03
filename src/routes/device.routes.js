const express = require("express");
const {
  saveDeviceInfo,
} = require("../controllers/device.controller");

const router = express.Router();

router.post("/", saveDeviceInfo);

module.exports = router;

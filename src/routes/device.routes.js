const express = require("express");
const router = express.Router();
const { saveDeviceInfo } = require("../controllers/device.controller");

router.post("/", saveDeviceInfo);

module.exports = router;

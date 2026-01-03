const express = require("express");
const {
  saveNotification,
} = require("../controllers/notification.controller");

const router = express.Router();

router.post("/", saveNotification);

module.exports = router;

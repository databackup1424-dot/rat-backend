const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { passcode } = req.body;

  if (!passcode) {
    return res.status(400).json({ success: false, message: "Passcode required" });
  }

  if (passcode === process.env.ADMIN_PASSCODE) {
    return res.json({
      success: true,
      token: "admin-demo-token"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid passcode"
  });
});

module.exports = router;

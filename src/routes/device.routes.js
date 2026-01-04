const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, deviceInfo } = req.body;

    if (!userId || !deviceInfo) {
      return res.status(400).json({ success: false });
    }

    // later Firestore write yahin hoga
    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false });
  }
});

module.exports = router;

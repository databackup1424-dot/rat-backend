const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// 🔹 Device Register API
router.post("/register", async (req, res) => {
  try {
    const { userId, deviceInfo } = req.body;

    if (!userId || !deviceInfo) {
      return res.status(400).json({
        success: false,
        message: "userId and deviceInfo required",
      });
    }

    await db.collection("devices").doc(userId).set({
      userId,
      deviceInfo,
      updatedAt: new Date(),
    });

    return res.json({
      success: true,
      message: "Device registered successfully",
    });
  } catch (err) {
    console.error("Device register error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;

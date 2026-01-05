const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// POST /api/messages
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({
        success: false,
        message: "userId and message required",
      });
    }

    await db
      .collection("messages")
      .doc(userId)
      .collection("logs")
      .add({
        ...message,
        createdAt: new Date(),
      });

    return res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (err) {
    console.error("Message save error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;

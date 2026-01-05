const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

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
  .collection("users")
  .doc(userId)
  .collection("messages")
  .add({
    message: message,   
    number: number || null,
    type: type || "inbox",
    status: "success",
    timestamp: new Date()
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

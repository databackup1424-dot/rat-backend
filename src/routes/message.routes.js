const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { userId, message, number, type } = req.body;

    console.log("Incoming message payload:", req.body);

    // ✅ validation
    if (!userId || !message) {
      return res.status(400).json({
        success: false,
        message: "userId and message required",
      });
    }

    // ✅ IMPORTANT FIX: docRef define karo
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("messages")
      .add({
        message: message,          // ✅ full text
        number: number || null,
        type: type || "inbox",
        status: "success",
        timestamp: new Date(),
      });

    console.log("Message saved with ID:", docRef.id);

    return res.json({
      success: true,
      message: "Message saved successfully",
      id: docRef.id,
    });
  } catch (err) {
    console.error("Message save error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ✅ GET messages for a user (ADMIN PANEL)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("Fetch messages error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


module.exports = router;

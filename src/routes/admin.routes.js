const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

/* =========================
   ADMIN LOGIN (already working)
========================= */
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

/* =========================
   READ-ONLY ADMIN APIs
========================= */

// 1️⃣ All users
router.get("/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({
      userId: doc.id,
      ...doc.data()
    }));

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2️⃣ Device info
router.get("/user/:userId/device", async (req, res) => {
  try {
    const { userId } = req.params;
    const doc = await db.collection("deviceInfo").doc(userId).get();

    res.json({
      success: true,
      device: doc.exists ? doc.data() : null
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3️⃣ Messages
router.get("/user/:userId/messages", async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db
      .collection("messages")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const messages = snapshot.docs.map(doc => doc.data());
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4️⃣ Notifications
router.get("/user/:userId/notifications", async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db
      .collection("notifications")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const notifications = snapshot.docs.map(doc => doc.data());
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

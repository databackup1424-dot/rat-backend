const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

router.get("/users", async (req, res) => {
  try {
    const snap = await db.collection("users").get();

    const users = snap.docs.map(doc => ({
      userId: doc.id,
      ...doc.data()
    }));

    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;

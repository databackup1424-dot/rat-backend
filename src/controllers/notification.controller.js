const { db } = require("../config/firebase");

exports.saveNotification = async (req, res) => {
  try {
    const { userId, data } = req.body;

    if (!userId || !data) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    await db
      .collection("notifications")
      .add({
        userId,
        ...data,
        createdAt: new Date(),
      });

    res.json({ status: "ok" });

  } catch (err) {
    console.error("🔥 Notification Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

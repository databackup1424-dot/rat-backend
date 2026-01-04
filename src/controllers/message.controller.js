const { db } = require("../config/firebase");

exports.saveMessage = async (req, res) => {
  try {
    const { userId, data } = req.body;

    if (!userId || !data) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    await db
      .collection("messages")
      .add({
        userId,
        ...data,
        createdAt: new Date(),
      });

    res.json({ status: "ok" });

  } catch (err) {
    console.error("🔥 Message Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

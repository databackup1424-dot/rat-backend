const { db } = require("../config/firebase");

exports.saveDeviceInfo = async (req, res) => {
  try {
    const { userId, data } = req.body;

    // ✅ validation (examiner-friendly)
    if (!userId || !data) {
      return res.status(400).json({
        error: "userId or data missing",
      });
    }

    await db
      .collection("devices")
      .doc(userId)
      .set(data, { merge: true });

    res.json({
      status: "ok",
      message: "Device info saved",
    });

  } catch (err) {
    // 🔥 MOST IMPORTANT LINE
    console.error("🔥 DeviceInfo Error:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};

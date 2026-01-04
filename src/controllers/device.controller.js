const { db } = require("../config/firebase");

exports.saveDeviceInfo = async (req, res) => {
  try {
    const { userId, deviceInfo } = req.body;

    await db.collection("devices").add({
      userId,
      deviceInfo,
      createdAt: new Date()
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

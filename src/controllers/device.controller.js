const {
  saveDeviceInfoService,
} = require("../services/device.service");

exports.saveDeviceInfo = async (req, res) => {
  try {
    const { userId, deviceInfo } = req.body;

    if (!userId || !deviceInfo) {
      return res.status(400).json({ error: "userId & deviceInfo required" });
    }

    await saveDeviceInfoService(userId, deviceInfo);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

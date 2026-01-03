const {
  saveNotificationService,
} = require("../services/notification.service");

exports.saveNotification = async (req, res) => {
  try {
    const { userId, notification } = req.body;

    if (!userId || !notification) {
      return res
        .status(400)
        .json({ error: "userId & notification required" });
    }

    await saveNotificationService(userId, notification);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const {
  saveMessageService,
} = require("../services/message.service");

exports.saveMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "userId & message required" });
    }

    await saveMessageService(userId, message);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

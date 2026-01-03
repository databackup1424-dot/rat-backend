const db = require("../config/firebase");

exports.saveNotificationService = async (userId, notification) => {
  await db
    .collection("users")
    .doc(userId)
    .collection("notifications")
    .add({
      ...notification,
      timestamp: new Date(),
    });
};

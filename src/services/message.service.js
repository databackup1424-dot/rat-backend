const db = require("../config/firebase");

exports.saveMessageService = async (userId, message) => {
  await db
    .collection("users")
    .doc(userId)
    .collection("messages")
    .add({
      ...message,
      timestamp: new Date(),
    });
};

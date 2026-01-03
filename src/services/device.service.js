const db = require("../config/firebase");

exports.saveDeviceInfoService = async (userId, deviceInfo) => {
  await db.collection("users").doc(userId).set(
    {
      deviceInfo: {
        ...deviceInfo,
        lastActive: new Date(),
      },
    },
    { merge: true }
  );
};

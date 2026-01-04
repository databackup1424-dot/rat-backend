const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let serviceAccount;

// ===============================
// 1️⃣ Production (Render)
// ===============================
if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      "base64"
    ).toString("utf-8");

    serviceAccount = JSON.parse(decoded);
    console.log("✅ Firebase loaded from BASE64 ENV");
  } catch (err) {
    console.error("❌ Firebase BASE64 ENV invalid");
    throw err;
  }
}

// ===============================
// 2️⃣ Local fallback
// ===============================
else {
  const filePath = path.join(__dirname, "../../serviceAccountKey.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("❌ Firebase key missing (env + local)");
  }

  serviceAccount = require(filePath);
  console.log("✅ Firebase loaded from local file");
}

// ===============================
// Init Firebase
// ===============================
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };

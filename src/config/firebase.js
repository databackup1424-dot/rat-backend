const admin = require("firebase-admin");

let serviceAccount;

// 🟢 CASE 1: Production (Render)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, "\n")
  );
}
// 🟢 CASE 2: Local development
else {
  serviceAccount = require("../../serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };

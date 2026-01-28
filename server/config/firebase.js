const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let db = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      db = admin.firestore();
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY not found in .env. Using in-memory fallback mode.");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error.message);
  console.warn("Using in-memory fallback mode due to initialization error.");
}

module.exports = { db };

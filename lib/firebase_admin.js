const admin = require("firebase-admin");

// Check and parse the Firebase service account key
let serviceAccount;
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEYS) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEYS is not defined in environment variables.");
  }
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEYS);
} catch (error) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEYS:", error.message);
  throw error;
}

// Initialize Firebase Admin SDK only once
if (admin.apps.length === 0) {
  try {
    console.log("Initializing Firebase Admin...");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error.message);
    throw error;
  }
} else {
  console.log("Firebase Admin already initialized.");
}

// Export Firestore database instance
const adminDB = admin.firestore();

module.exports = { admin, adminDB };

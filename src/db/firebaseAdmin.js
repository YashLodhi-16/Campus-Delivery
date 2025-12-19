import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;

/**
 * @param {string} key
 */
const formatPrivateKey = (key) => {
  return key.replace(/\\n/g, "\n");
};

const privateKey = formatPrivateKey(FIREBASE_PRIVATE_KEY);

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey,
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
});

export const db = getFirestore();

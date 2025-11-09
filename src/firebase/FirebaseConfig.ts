import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

const initializeIfNeeded = () => {
  if (typeof window === "undefined") return;
  if (!app) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    googleProviderInstance = new GoogleAuthProvider();
  }
};

export const getAuthInstance = (): Auth => {
  initializeIfNeeded();
  if (!authInstance) {
    throw new Error("Firebase Auth not initialized. This should never happen in browser.");
  }
  return authInstance;
};

export const getGoogleProvider = (): GoogleAuthProvider => {
  initializeIfNeeded();
  if (!googleProviderInstance) {
    throw new Error("Google Provider not initialized.");
  }
  return googleProviderInstance;
};
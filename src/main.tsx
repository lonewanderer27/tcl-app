import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { getRemoteConfig } from "firebase/remote-config";

import App from "./App";
import { Capacitor } from "@capacitor/core";
import { Providers } from "./Providers";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import { isPlatform } from "@ionic/react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHAV3PROVIDER),
});
export const remoteConfig = getRemoteConfig(app);

if (Capacitor.isNativePlatform()) {
  initializeAuth(app, {
    persistence: indexedDBLocalPersistence,
  })
} else {
  getAuth(app);
}

// Check if the app is running in a native Capacitor environment
const isNative = isPlatform("capacitor");

// register service worker if we're not capacitor
if (!isNative) {
  // Register the service worker only for web deployments
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Providers>
    <App />
  </Providers>
);

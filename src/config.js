// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebas
const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
    const analytics = getAnalytics(app);
}

// Firebase authentication service
export const auth = getAuth();
    // Firebase firestore service
export const db = getFirestore(app);
    // Firebase storage service
export const storage = getStorage();

export default function configuration() {
    if (location.hostname === "127.0.0.1") {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        connectFirestoreEmulator(db, "127.0.0.1", 8080)
    }
}
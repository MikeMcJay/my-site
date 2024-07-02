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

export default function configuration() {
    // Firebase authentication service
    const auth = getAuth();
    // Firebase storage service
    const storage = getStorage();
    // Firebase firestore service
    const firestore = getFirestore();

    if (location.hostname === "127.0.0.1") {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        connectFirestoreEmulator(firestore, "127.0.0.1", 8080)
    }
}

export const db = getFirestore(app)
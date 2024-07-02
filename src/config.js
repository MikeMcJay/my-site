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
}

export const db = getFirestore(app)
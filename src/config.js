// *** Main style config ***
import './styles/main.css';

import * as $ from 'jquery'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

firebaseConfig

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function configuration() {
    // *** Loading config ***
    window.onload = function() {
        // Once the page has loaded then hide the loading div
        document.getElementById("loading-screen").hidden = true;
    }

    // Load the loading screen
    $(function(){
        $("#loading-screen").load(location.origin + "/loading-screen.html");
    });

    // Firebase authentication service
    const auth = getAuth();
    // Firebase storage service
    const storage = getStorage();
    // Firebase firedtore service
    const firestore = getFirestore();

    const favicon = ref(storage, 'images/common/favicon.ico');
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    getDownloadURL(favicon).then((url) => {
       link.href = url;
    });

    if (location.hostname === "127.0.0.1") {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        connectFirestoreEmulator(firestore, "127.0.0.1", 8080)
    }
}

export const db = getFirestore(app)
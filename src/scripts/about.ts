import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config";

// Firebase storage functions
export async function getProfilePicture() {
    const meRef = ref(storage, `images/common/me.jpg`);
    return getDownloadURL(meRef);
}
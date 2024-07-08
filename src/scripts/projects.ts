import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, ref } from "firebase/storage";

// Firestore functions
export async function getProject(projectID: string) {
    const projectRef = doc(db, "projects", projectID);
    return await getDoc(projectRef);
}

export async function getProjectHighlights() {
    const projectHighlightRef = collection(db, "projects");
    const q = query(projectHighlightRef, where("isHighlight", "==", true));
    return await getDocs(q);
}

export async function getOtherProjects() {
    const otherProjectRefs = collection(db, "projects");
    const q = query(otherProjectRefs, where("isHighlight", "==", false));
    return await getDocs(q);
}

// Firebase storage functions
export async function getProjectBannerURL(projectID: string) {
    const bannerRef = ref(storage, `images/projects/${projectID}/banner.png`);
    return getDownloadURL(bannerRef);
}
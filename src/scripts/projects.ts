import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, listAll, ListResult, ref } from "firebase/storage";

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

export async function getProjectImageURLs(projectID: string) {
    const projectImagesRef = ref(storage, `images/projects/${projectID}`);
    const projectResources = await listAll(projectImagesRef);
    return await getImages(projectResources);
}

async function getImages(projectResources: ListResult) {
    const imageURLs = new Map<string, string>();
    var index = 0;
    for (const itemRef of projectResources.items) {
        const url = await getDownloadURL(itemRef);
        imageURLs.set(getFileNameWithoutExtension(itemRef.name), url);
        if (index === projectResources.items.length - 1) return (imageURLs);
        index += 1;
    }
}

function getFileNameWithoutExtension(filename: string) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return filename;
    } else {
        return filename.substring(0, lastDotIndex);
    }
}
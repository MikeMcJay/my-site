import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

export async function getProjectHighlights() {
    const projectHighlightRef = collection(db, "projects");
    const q = query(projectHighlightRef, where("isHighlight", "==", true));
    return await getDocs(q);
}
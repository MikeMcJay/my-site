import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import { ArticleStatus } from "../types";

// Firestore functions
export async function getArticle(articleID: string) {
    const articleRef = doc(db, "articles", articleID);
    return await getDoc(articleRef);
}

export async function getArticles() {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, where("status", "==", ArticleStatus.PUBLISHED.toString()));
    return await getDocs(q);
}
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import { ArticleStatus } from "../types";

// Firestore functions
export async function getArticle(articleID: string) {
    const articleRef = doc(db, "articles", articleID);
    return await getDoc(articleRef);
}

export async function getArticles(articleStatus: ArticleStatus = ArticleStatus.PUBLISHED) {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, where("status", "==", articleStatus));
    return await getDocs(q);
}

// Determine the read time for an article
function getWordCount(text: string) {
    return text.trim().split(/\s+/).length;
}

export function getReadTime(text: string) {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = getWordCount(text);
    return Math.ceil(wordCount / wordsPerMinute);
}
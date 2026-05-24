import { useEffect, useRef, useState } from "react";
import { Article, ArticleStatus } from "../../src/types";
import { getArticles } from "../../src/scripts/articles";
import Link from "next/link";
import useOnScreen from "../../src/scripts/detectOnScreen";
import { Tag } from "../tag";

export default function ArticlePanel() {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(ref)
    const [articlesVisible, setArticlesVisible] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setArticlesVisible(isVisible);
        }
    }, [isVisible]);

    const [articles, setArticles] = useState<Map<string, Article>>(new Map());

    useEffect(() => {
        getArticles().then((snapshot) => {
            snapshot.forEach((article) => {
                setArticles(map => new Map(map.set(article.id, article.data() as Article)));
            });
            // If in development mode show draft articles as well
            if (process.env.NODE_ENV === "development") {
                getArticles(ArticleStatus.DRAFT).then((snapshot) => {
                    snapshot.forEach((article) => {
                        setArticles(map => new Map(map.set(article.id, article.data() as Article)));
                    });
                });
            }
        });
    }, []);

    // Sorted articles array
    const sortedArticles = Array.from(articles);
    sortedArticles.sort((a, b) => {
        const timeA: Date = new Date(0);
        timeA.setUTCSeconds(a[1].created.seconds);
        const timeB: Date = new Date(0);
        timeB.setUTCSeconds(b[1].created.seconds);        
        return timeB.valueOf() - timeA.valueOf()
    });

    return (
        <div id="articles" ref={ref} className={`article-panel ${articlesVisible? "visible animate-fade-up": "invisible"}`}>
            <div className="article-header">
                <h3 className="article-title">Articles</h3>
                <p>Bite-sized reads about random topics that I've shown interest in, whether it be new technologies or just personal insights.</p>
            </div>
            <div className="articles-container">
                {sortedArticles.map((article, index) => (
                    <ArticleInfo key={article[0]} articleID={article[0]} article={article[1]}/>
                ))}
            </div>
        </div>
    )
}

function ArticleInfo({
    articleID,
    article
}: {
    articleID: string,
    article: Article
}) {
    const created: Date = new Date(0);
    created.setUTCSeconds(article.created.seconds);

    return (
        <div key={articleID} className="article">
            <Link href={`article/${articleID}`} className="alt2">
                <h4>{article.title}</h4>
            </Link>
            <Link href={`article/${articleID}`} className="alt2">
                <h5>{created.toLocaleDateString([], {month: "short", year: "numeric"})}</h5>
            </Link>
            <Link href={`article/${articleID}`} className="alt2">
                <p>{article.subtitle}</p>  
            </Link>
            <div className="article-tags">
                {article.labels && Object.entries(article.labels).map((tag) => (
                    <Tag key={tag[0]} tagID={tag[0]} tagName={tag[1]}/>
                ))}
            </div>
        </div>
    )
}
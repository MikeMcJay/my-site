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
            {!article.complete && <div className="article-incomplete">
                <h5>Unfinished Article</h5>
                <svg className="article-incomplete-article-icon" stroke="currentColor" fill="currentColor" viewBox="0 -960 960 960">
                    <path d="M714-162 537-339l84-84 177 177q17 17 17 42t-17 42q-17 17-42 17t-42-17Zm-569-42q0-25 17-42l234-234-68-68q-11 11-28 11t-28-11l-23-23v90q0 14-12 19t-22-5L106-576q-10-10-5-22t19-12h90l-22-22q-12-12-12-28t12-28l114-114q20-20 43-29t47-9q20 0 37.5 6t34.5 18q8 5 8.5 14t-6.5 16l-76 76 22 22q11 11 11 28t-11 28l68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q8 0 15 .5t14 2.5q9 3 11.5 12.5T737-809l-65 65q-6 6-6 14t6 14l44 44q6 6 14 6t14-6l65-65q7-7 16.5-5t12.5 12q2 7 2.5 14t.5 15q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L246-162q-17 17-42 17t-42-17q-17-17-17-42Z"/>
                </svg>
            </div>}
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
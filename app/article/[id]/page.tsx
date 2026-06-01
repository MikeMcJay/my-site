'use client'

import { useEffect, useState } from "react";
import { Article } from "../../../src/types";
import { getArticle, getReadTime } from "../../../src/scripts/articles";
import { Diffusion } from "../../../components/homepage/diffusion";
import { SideNavBar, TopNavBar } from "../../../components/navbar";
import { useParams } from "next/navigation";
import { marked } from 'marked';

import '../../../styles/pages/article.css'
import { Tag } from "../../../components/tag";
import { ProgressBar } from "../../../components/progressBar";

export default function Page() {
    const params = useParams<{ id: string }>();
    const [showSideBar, setShowSideBar] = useState(false);
    const [article, setArticle] = useState<Article>();

    useEffect(() => {
        getArticle(params.id).then((articleSnapshot) => {
            if (articleSnapshot.exists()) {
                setArticle(articleSnapshot.data() as Article);
            }
        });
    }, []);

    if (!article) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <Diffusion/>
            <TopNavBar showSideBar={ (show) => { setShowSideBar(show) } }/>
            <SideNavBar closeSideBar={ () => { setShowSideBar(false) } } show={showSideBar}/>
            <div className="article-content">
                <div className="article-panel animate-fade-up animate-delay-75">
                    <h2>{article.title}</h2>
                    {!article.complete && <div className="article-incomplete">
                        <h5>Unfinished Article</h5>
                        <svg className="article-incomplete-article-icon" stroke="currentColor" fill="currentColor" viewBox="0 -960 960 960">
                            <path d="M714-162 537-339l84-84 177 177q17 17 17 42t-17 42q-17 17-42 17t-42-17Zm-569-42q0-25 17-42l234-234-68-68q-11 11-28 11t-28-11l-23-23v90q0 14-12 19t-22-5L106-576q-10-10-5-22t19-12h90l-22-22q-12-12-12-28t12-28l114-114q20-20 43-29t47-9q20 0 37.5 6t34.5 18q8 5 8.5 14t-6.5 16l-76 76 22 22q11 11 11 28t-11 28l68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q8 0 15 .5t14 2.5q9 3 11.5 12.5T737-809l-65 65q-6 6-6 14t6 14l44 44q6 6 14 6t14-6l65-65q7-7 16.5-5t12.5 12q2 7 2.5 14t.5 15q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L246-162q-17 17-42 17t-42-17q-17-17-17-42Z"/>
                        </svg>
                    </div>}
                    <h5>{article.created.toDate().toLocaleDateString([], {day: "numeric", month: "short", year: "numeric"})} • {getReadTime(article.markdown)} min read</h5>
                    <p>{article.subtitle}</p>
                    <div className="tags">
                        {article.labels && Object.entries(article.labels).map((tag) => (
                            <Tag key={tag[0]} tagID={tag[0]} tagName={tag[1]}/>
                        ))}
                    </div>
                    <div className="article-panel article-markdown animate-fade-up animate-delay-75" dangerouslySetInnerHTML={{ __html: marked.parse(article.markdown) }}></div>
                </div>
            </div>
            <ProgressBar enabled={article.progressBar} />
        </div>
    )
}
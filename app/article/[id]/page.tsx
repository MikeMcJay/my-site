'use client'

import { useEffect, useState } from "react";
import { Article } from "../../../src/types";
import { getArticle } from "../../../src/scripts/articles";
import { Diffusion } from "../../../components/homepage/diffusion";
import { SideNavBar, TopNavBar } from "../../../components/navbar";
import { marked } from 'marked';

import '../../../styles/pages/article.css'
import { Tag } from "../../../components/tag";
import { ProgressBar } from "../../../components/progressBar";

export default function Page({
    params
}: {
    params: {
        id: string
    }
}) {
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
                    <h5>{article.created.toDate().toLocaleDateString([], {day: "numeric", month: "short", year: "numeric"})}</h5>
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
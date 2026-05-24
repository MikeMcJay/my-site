'use client'

import { useEffect, useState } from "react";
import { Article } from "../../../src/types";
import { getArticle } from "../../../src/scripts/articles";
import { Diffusion } from "../../../components/homepage/diffusion";
import { SideNavBar, TopNavBar } from "../../../components/navbar";
import { marked } from 'marked';

import '../../../styles/pages/article.css'

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
            <div className="content">
                <div className="article-panel animate-fade-up animate-delay-75">
                    <h2>{article.title}</h2>
                    <h5>{article.created.toDate().toLocaleDateString([], {day: "numeric", month: "short", year: "numeric"})}</h5>
                    <p>{article.subtitle}</p>
                    <div className="article-panel article-markdown animate-fade-up animate-delay-75" dangerouslySetInnerHTML={{ __html: marked.parse(article.markdown) }}></div>
                </div>
            </div>
        </div>
    )
}
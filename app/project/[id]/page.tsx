'use client'

import { useEffect, useState } from "react"
import { Project } from "../../../src/types";
import { getProject, getProjectFileURLs } from "../../../src/scripts/projects";
import { Tag } from "../../../components/tag";
import { LinkIcon } from "../../../components/icon";

import '../../../styles/pages/project.css'
import { Diffusion } from "../../../components/homepage/diffusion";
import { SideNavBar, TopNavBar } from "../../../components/navbar";
import ImageCarousel from "../../../components/page/imageCarousel";

import { marked } from 'marked';
import { ProgressBar } from "../../../components/progressBar";

export default function Page({
    params
}: {
    params: {
        id: string
    }
}) {
    const [showSideBar, setShowSideBar] = useState(false);
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        getProject(params.id).then((projectSnapshot) => {
            if (projectSnapshot.exists()) {
                setProject(projectSnapshot.data() as Project);
            }
        });
    }, []);

    const [projectFiles, setProjectFiles] = useState<Map<string, string>>();
    useEffect(() => {
        // Get all project files
        getProjectFileURLs(params.id).then((fileMap) => {
            if (fileMap) {
                setProjectFiles(fileMap);
            }
        });
    }, []);

    if (!project) {
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
                <div className="project-panel w-full animate-fade-up animate-delay-75">
                    <ImageCarousel projectFiles={projectFiles}/>
                    <h2>{project.title}</h2>
                    <h5>{project.started.toDate().toLocaleDateString([], {month: "short", year: "numeric"})}{(project.end != null) && " - " + project.end.toDate().toLocaleDateString([], {month: "short", year: "numeric"})}</h5>
                    <p>{project.subtitle}</p>
                    <div className="project-highlight-tags">
                        {Object.entries(project.labels).map((tag) => (
                            <Tag tagID={tag[0]} tagName={tag[1]}/>
                        ))}
                    </div>
                    {(project.links != null) && <div className="other-project-links">
                    {Object.entries(project.links).map((link) => {
                        const linkType = link[0] as "external" | "external2" | "github" | "gitlab" | "docker" | "docker2";
                        return <LinkIcon linkType={linkType} link={link[1]}/>
                    })}
                    </div>}
                    {!project.isMarkdown && <p>{project.details}</p>}
                </div>
                {project.isMarkdown && <div className="project-panel project-markdown">
                    <div className="project-panel project-markdown animate-fade-up animate-delay-75" dangerouslySetInnerHTML={{ __html: marked.parse(project.markdown) }}></div>
                </div>}
            </div>
            <ProgressBar enabled={project.isMarkdown}/>
        </div>
    )
}
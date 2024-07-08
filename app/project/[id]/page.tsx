'use client'

import { useEffect, useState } from "react"
import { Project } from "../../../src/types";
import { getProject, getProjectBannerURL } from "../../../src/scripts/projects";
import { Tag } from "../../../components/tag";
import { LinkIcon } from "../../../components/icon";

import '../../../styles/pages/project.css'
import { Diffusion } from "../../../components/homepage/diffusion";
import { SideNavBar, TopNavBar } from "../../../components/navbar";

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

    const [projectBannerURL, setProjectBannerURl] = useState("");
    useEffect(() => {
        getProjectBannerURL(params.id).then((url) => {
            setProjectBannerURl(url);
        }).catch((error) => {
            // No banner exists
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
                <div className="project-panel animate-fade-up animate-delay-75">
                    {(projectBannerURL != "") && <img
                        className="project-banner"
                        src={projectBannerURL}
                        alt="Project banner"
                    />}
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
                    <p>{project.details}</p>
                </div>
            </div>
        </div>
    )
}
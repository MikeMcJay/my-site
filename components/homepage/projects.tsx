'use client'

import { useEffect, useRef, useState } from "react";
import { getOtherProjects, getProjectBannerURL, getProjectHighlights } from "../../src/scripts/projects";
import { Project } from "../../src/types";
import { LinkIcon } from "../icon";
import { Tag } from "../tag";
import useOnScreen from "../../src/scripts/detectOnScreen";
import { ButtonCustom } from "../button";

export default function ProjectPanel() {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(ref)
    const [projectPanelVisible, setProjectPanelVisible] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setProjectPanelVisible(isVisible);
        }
    }, [isVisible]);

    const [projectHighlights, setProjectHighlights] = useState<Map<string, Project>>(new Map());
    const [otherProjects, setOtherProjects] = useState<Map<string, Project>>(new Map());
    const [showMoreProjects, setShowMoreProjects] = useState(false);

    useEffect(() => {
        getProjectHighlights().then((snapshot) => {
            snapshot.forEach((project) => {
                setProjectHighlights(map => new Map(map.set(project.id, project.data() as Project)));
            });
        });
        getOtherProjects().then((snapshot) => {
            snapshot.forEach((project) => {
                setOtherProjects(map => new Map(map.set(project.id, project.data() as Project)));
            });
        });
    }, []);

    // Sorted other projects array
    const sortedOtherProjects = Array.from(otherProjects);
    sortedOtherProjects.sort((a, b) => {
        const timeA: Date = new Date(0);
        timeA.setUTCSeconds(a[1].end.seconds);
        const timeB: Date = new Date(0);
        timeB.setUTCSeconds(b[1].end.seconds);        
        return timeB.valueOf() - timeA.valueOf()
    });

    return (
        <div id="projects" ref={ref} className={`project-panel ${projectPanelVisible? "visible animate-fade-up": "invisible"}`}>
            <h3>Project highlights</h3>
            {Array.from(projectHighlights).map((project, index) => (
                <ProjectHighlight key={project[0]} projectID={project[0]} project={project[1]} left={!(index % 2 === 0)}/>
            ))}
            <h4 className="self-center">Other projects</h4>
            <div className="other-projects-container">
                {sortedOtherProjects.map((project, index) => {
                    if (index >= (showMoreProjects? sortedOtherProjects.length : 6)) {
                        return null;
                    }
                    return <OtherProjects key={project[0]} project={project[1]}/>
                })}    
            </div>
            <ButtonCustom onClick={() => { setShowMoreProjects(!showMoreProjects) }}>{showMoreProjects? "Show less" : "Show more"}</ButtonCustom>
        </div>
    )
}

function ProjectHighlight({
    projectID,
    project,
    left
}: {
    projectID: string,
    project: Project,
    left: boolean
}) {
    const [projectBannerURL, setProjectBannerURl] = useState("");
    useEffect(() => {
        getProjectBannerURL(projectID).then((url) => {
            setProjectBannerURl(url);
        })
    }, []);

    return (
        <div className="project-highlight-container">
            <div className={left? "project-highlight-image-container-left" : "project-highlight-image-container-right"}>
                <img
                    className="project-highlight-image"
                    src={projectBannerURL}
                    alt="MikeMcJay"
                />
            </div>
            <div className={left? "project-highlight-left" : "project-highlight-right"}>
                <p className="subheading2 text-lime-600">Recent</p>
                <h4>{project.title}</h4>
                <div className="project-highlight-details">
                    <div className="pt-5">
                        <p>{project.subtitle}</p>
                    </div>
                    <div className={left? "project-highlight-tags-left" : "project-highlight-tags-right"}>
                        {Object.entries(project.labels).map((tag) => (
                            <Tag tagID={tag[0]} tagName={tag[1]}/>
                        ))}
                    </div>
                    {(project.links != null) && <div className={left? "project-highlight-links-left" : "project-highlight-links-right"}>
                        {Object.entries(project.links).map((link) => {
                            const linkType = link[0] as "external" | "external2" | "github" | "gitlab" | "docker" | "docker2";
                            return <LinkIcon linkType={linkType} link={link[1]}/>
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

function OtherProjects({
    project
}: {
    project: Project
}) {
    const started: Date = new Date(0);
    const finished: Date = new Date(0);
    started.setUTCSeconds(project.started.seconds);
    finished.setUTCSeconds(project.end.seconds);

    return (
        <div key={project.title} className="other-project">
            <h4>{project.title}</h4>
            <h5>{started.toLocaleDateString([], {month: "short", year: "numeric"})} - {finished.toLocaleDateString([], {month: "short", year: "numeric"})}</h5>
            <p>{project.subtitle}</p>
            <div className="project-highlight-tags-left">
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
        </div>
    )
}
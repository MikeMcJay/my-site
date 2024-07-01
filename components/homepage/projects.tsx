'use client'

import { useEffect, useState } from "react";
import { getOtherProjects, getProjectHighlights } from "../../src/scripts/projects";
import { Project } from "../../src/types";
import { LinkIcon } from "../icon";

export default function ProjectPanel() {
    const [projectHighlights, setProjectHighlights] = useState<Map<string, Project>>(new Map());
    const [otherProjects, setOtherProjects] = useState<Map<string, Project>>(new Map());

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

    return (
        <div className="project-panel">
            <h3>Project highlights</h3>
            {Array.from(projectHighlights).map((project, index) => (
                <ProjectHighlight key={project[0]} project={project[1]} left={!(index % 2 === 0)}/>
            ))}
            <h4 className="self-center">Other projects</h4>
            <div className="other-projects-container">
                {Array.from(otherProjects).map((project) => (
                    <OtherProjects key={project[0]} project={project[1]}/>
                ))}    
            </div>       
        </div>
    )
}

function ProjectHighlight({
    project,
    left
}: {
    project: Project,
    left: boolean
}) {
    return (
        <div className="project-highlight-container">
            <div className={left? "project-highlight-image-container-left" : "project-highlight-image-container-right"}>
                <img
                    className="project-highlight-image"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="MikeMcJay"
                />
            </div>
            <div className={left? "project-highlight-left" : "project-highlight-right"}>
                <p className="subheading2">Recent</p>
                <h4>{project.title}</h4>
                <div className="project-highlight-details">
                    <div className="pt-5">
                        <p>{project.subtitle}</p>
                    </div>
                    <div className={left? "project-highlight-tags-left" : "project-highlight-tags-right"}>
                        {Object.entries(project.labels).map((tag) => (
                            <p>{tag[1]}</p>
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
    return (
        <div key={project.title} className="other-project">
            <h4>{project.title}</h4>
            <p>{project.subtitle}</p>
            <div className="project-highlight-tags-left">
                {Object.entries(project.labels).map((tag) => (
                    <p>{tag[1]}</p>
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
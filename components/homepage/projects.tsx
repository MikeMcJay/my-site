'use client'

import { useEffect, useState } from "react";
import { getProjectHighlights } from "../../src/scripts/projects";
import { Project } from "../../src/types";

export default function ProjectPanel() {
    const [projectHighlights, setProjectHighlights] = useState<Map<string, Project>>(new Map());

    useEffect(() => {
        getProjectHighlights().then((snapshot) => {
            snapshot.forEach((project) => {
                setProjectHighlights(map => new Map(map.set(project.id, project.data() as Project)));
            });
        })
    }, []);

    return (
        <div className="project-panel">
            <h3>Project highlights</h3>
            {Array.from(projectHighlights).map((project, index) => (
                <ProjectHighlight key={project[0]} project={project[1]} left={!(index % 2 === 0)}/>
            ))}
            <h4 className="self-center">Other projects</h4>
            <OtherProjects/>
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
                </div>
            </div>
        </div>
    )
}

const projects = [
    { name: "Project 1", description: "A small description of this project", tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6"] },
    { name: "Project 2", description: "A small description of this project", tags: ["Tag 1", "Tag 2", "Tag 3"] },
    { name: "Project 3", description: "A small description of this project", tags: ["Tag 1", "Tag 2", "Tag 3"] },
]

function OtherProjects() {
    return (
        <div className="other-projects-container">
            {projects.map((project) => (
                <div key={project.name} className="other-project">
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                    <div className="other-project-tags">
                        {project.tags.map((tag) => (
                            <p className="caption">{tag}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
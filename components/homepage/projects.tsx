'use client'

export default function ProjectPanel() {
    return (
        <div className="project-panel">
            <h3>Project highlights</h3>
            <ProjectHighlight left={false}/>
            <ProjectHighlight left={true}/>
            <h4 className="self-center">Other projects</h4>
            <OtherProjects/>
        </div>
    )
}

function ProjectHighlight({
    left
}: {
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
                <h4>Project name</h4>
                <div className="project-highlight-details">
                    <div className="pt-5">
                        <p>A description of the project that you've made. This should tell us allll about what
                            sorta good stuff you got up to with it.
                        </p>
                    </div>
                    <div className={left? "project-highlight-tags-left" : "project-highlight-tags-right"}>
                        <p>Tag 1</p>
                        <p>Tag 2</p>
                        <p>Tag 3</p>
                        <p>Tag 4</p>
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
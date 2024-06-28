'use client'

import { Subheading } from "../text"

export default function ProjectPanel() {
    return (
        <div className="flex flex-col py-10 gap-5">
            <h3>Project highlights</h3>
            <ProjectHighlight/>
        </div>
    )
}

function ProjectHighlight() {
    return (
        <div className="flex flex-row gap-10 items-center">
            <div className="flex basis-3/5 justify-center">
                <img
                    className="h-96 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="MikeMcJay"
                />
            </div>
            <div className="flex flex-col basis-2/5 text-end">
                <Subheading className="subheading2">Recent</Subheading>
                <h3>Project name</h3>
                <div className="flex flex-col gap-5">
                    <div className="pt-5">
                        <p>A description of the project that you've made. This should tell us allll about what
                            sorta good stuff you got up to with it.
                        </p>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-end">
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
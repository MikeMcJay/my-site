export function LinkIcon({
    linkType,
    link
}: {
    linkType: "external" | "external2" | "github" | "gitlab" | "docker" | "docker2",
    link: string
}) {
    switch (linkType) {
        case "external":
        case "external2": {
            return (
                <a href={link} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="transition ease-in-out duration-300 size-6 hover:text-sky-300">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            )
        }
        case "github": {
            return (
                <a href={link} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="transition ease-in-out duration-300 size-6 hover:text-gray-500">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>
            )
        }
        case "gitlab": {
            return (
                <a href={link} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="transition ease-in-out duration-300 size-6 hover:text-orange-500">
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
                    </svg>
                </a>
            )
        }
        case "docker":
        case "docker2": {
            return (
                <a href={link} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2" stroke="currentColor" className="transition ease-in-out duration-300 size-6 hover:text-docker-100" viewBox="-237 239 24 24">
                    <g id="Layer_2">
                        <g>
                            <path d="M-219.2,251.8c-0.8-1.4-0.5-2.7,0.4-4c0.2,0.2,0.5,0.3,0.7,0.5c0.6,0.5,1,1.1,1.1,1.9c0,0.1,0.1,0.1,0.2,0.1
                                c0.6-0.1,1.2-0.1,1.8,0.1c0.3,0.1,0.6,0.3,0.8,0.4c0.1,0.1,0.1,0.1,0.1,0.3c-0.4,0.9-1,1.5-2,1.8c-0.4,0.1-0.8,0.1-1.2,0.2
                                c-0.1,0-0.2,0-0.3,0.2c-0.4,1.1-1,2.2-1.7,3.1c-1.3,1.7-3,2.9-5,3.5c-0.9,0.3-1.9,0.5-2.9,0.6c-0.8,0-1.6,0.1-2.4,0
                                c-1.1,0-2.1-0.2-3.2-0.7c-1.2-0.5-2-1.4-2.6-2.5c-0.4-0.9-0.7-1.8-0.8-2.8c-0.1-0.5-0.1-1-0.1-1.5c0-0.5,0.3-0.8,0.8-0.8
                                c4.8,0,9.6,0,14.3,0c0.5,0,1-0.1,1.5-0.2C-219.4,251.9-219.3,251.9-219.2,251.8z"/>
                            <g>
                                <path d="M-224.4,243.4c0-0.4,0-0.9,0-1.3c0-0.3-0.2-0.5-0.5-0.5c-0.2,0-0.4,0-0.7,0c-0.2,0-0.4,0-0.7,0c0,0,0,0,0,0
                                    c-0.3,0-0.5,0.2-0.5,0.5c0,0.4,0,0.9,0,1.3 M-224.4,246.2c0-0.4,0-0.9,0-1.3 M-230.4,244.4c-0.2,0-0.4,0-0.7,0
                                    c-0.2,0-0.4,0-0.6,0c-0.3,0-0.5,0.2-0.5,0.5c0,0.4,0,0.9,0,1.3 M-233.2,247.1c-0.5,0-0.9,0-1.4,0c-0.3,0-0.4,0.2-0.4,0.5
                                    c0,0.2,0,0.4,0,0.6c0,0.2,0,0.4,0,0.7c0,0.3,0.2,0.5,0.5,0.5c0.4,0,0.9,0,1.3,0"/>
                                <g>
                                    <path d="M-224.4,247.1c0-0.4,0-1.9,0-2.3l0-0.7c0-0.4,0-1.6,0-2c0-0.3-0.2-0.5-0.5-0.5c-0.2,0-0.4,0-0.7,0
                                        c-0.2,0-0.4,0-0.7,0c0,0,0,0,0,0c-0.3,0-0.5,0.2-0.5,0.5c0,0.4,0,1.6,0,2.1"/>
                                    <path d="M-226.6,244.4c-0.2,0-4.2,0-4.4,0c-0.2,0-0.4,0-0.6,0c-0.3,0-0.5,0.2-0.5,0.5c0,0.4,0,1.8,0,2.3"/>
                                </g>
                                <path d="M-224.3,247.1c0.3,0,1.6,0,1.9,0c0.1,0,0.3,0,0.4,0c0.2,0,0.4,0.2,0.4,0.4c0,0.5,0,0.9,0,1.4
                                    c0,0.3-0.2,0.4-0.4,0.4c-0.5,0-9.8,0-10.2,0l-0.1,0c-0.4,0-1.7,0-2.2,0c-0.3,0-0.5-0.2-0.5-0.5c0-0.2,0-0.4,0-0.7
                                    c0-0.2,0-0.4,0-0.6c0-0.3,0.1-0.5,0.4-0.5c0.5,0,1.8,0,2.3,0"/>
                            </g>
                        </g>
                    </g>
                    <g id="Layer_1">
                    </g>
                    </svg>
                </a>
            )
        }
        // Maybe add an icon for colab too?
    }
    return null;
}
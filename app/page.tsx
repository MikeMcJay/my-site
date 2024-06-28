import React from "react"
import { TopNavBar } from "../components/navbar"
import { Subheading } from "../components/text"
import AboutPanel from "../components/homepage/about"

export default function Page() {
    return (
        <div>
            <TopNavBar/>
            <div className="content">
                <h1>Heading one</h1>
                <h2>Heading two</h2>
                <h3>Heading three</h3>
                <Subheading>Subheading 1</Subheading>
                <Subheading className="subheading2">Subheading 2</Subheading>
                <p>Paragraph</p>
                <AboutPanel/>
            </div>
        </div>
    )
}
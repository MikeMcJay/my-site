import React from "react"
import { TopNavBar } from "../components/navbar"
import AboutPanel from "../components/homepage/about"
import ProjectPanel from "../components/homepage/projects"
import ContactPanel from "../components/homepage/contact"
import { Footer } from "../components/footer"

export default function Page() {
    return (
        <div>
            <TopNavBar/>
            <div className="content">
                <h1>Heading one</h1>
                <h2>Heading two</h2>
                <h3>Heading three</h3>
                <p className="subheading1">Subheading 1</p>
                <p className="subheading2">Subheading 2</p>
                <p>Paragraph</p>
                <AboutPanel/>
                <ProjectPanel/>
                <ContactPanel/>
                <Footer/>
            </div>
        </div>
    )
}
import React, { useEffect } from "react"
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
                <p className="subheading1">Hi there, I'm</p>
                <h1>MikeMcJay.</h1>
                <h3 className="welcome">Welcome to my site.</h3>
                <AboutPanel/>
                <ProjectPanel/>
                <ContactPanel/>
                <Footer/>
            </div>
        </div>
    )
}
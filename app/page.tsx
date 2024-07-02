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
                <AboutPanel/>
                <ProjectPanel/>
                <ContactPanel/>
                <Footer/>
            </div>
        </div>
    )
}
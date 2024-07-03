'use client'

import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useState } from "react"
import { SideNavBar, TopNavBar } from "../components/navbar"
import AboutPanel from "../components/homepage/about"
import ProjectPanel from "../components/homepage/projects"
import ContactPanel from "../components/homepage/contact"
import { Footer } from "../components/footer"
import { Diffusion } from "../components/homepage/diffusion"

// const AboutPanel = dynamic(() => import("../components/homepage/about"));
// const ProjectPanel = dynamic(() => import("../components/homepage/projects"));
// const ContactPanel = dynamic(() => import("../components/homepage/contact"));

export default function Page() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [showProjectPanel, setShowProjectPanel] = useState(false);
    const [showContactPanel, setShowContactPanel] = useState(false);

    return (
        <div>
            <Diffusion/>
            <TopNavBar showSideBar={ (show) => { setShowSideBar(show) } }/>
            <SideNavBar closeSideBar={ () => { setShowSideBar(false) } } show={showSideBar}/>
            <div className="content">
                <AboutPanel/>
                <ProjectPanel/>
                <ContactPanel/>
                <Footer/>
            </div>
        </div>
    )
}
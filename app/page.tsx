'use client'

import React, { useCallback, useEffect, useState } from "react"
import { SideNavBar, TopNavBar } from "../components/navbar"
import AboutPanel from "../components/homepage/about"
import ProjectPanel from "../components/homepage/projects"
import ContactPanel from "../components/homepage/contact"
import { Footer } from "../components/footer"
import { Diffusion } from "../components/homepage/diffusion"

import '../styles/pages/home.css'

export default function Page() {
    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <div>
            <Diffusion/>
            <TopNavBar showSideBar={ (show) => { setShowSideBar(show) } }/>
            <SideNavBar closeSideBar={ () => { setShowSideBar(false) } } show={showSideBar}/>
            <div className="content gap-32">
                <AboutPanel/>
                <ProjectPanel/>
                <ContactPanel/>
                <Footer/>
            </div>
        </div>
    )
}
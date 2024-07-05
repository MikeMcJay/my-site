'use client'

import { useState } from "react";
import { SideNavBar, TopNavBar } from "../components/navbar"
import { Diffusion } from "../components/homepage/diffusion";

export default function NotFound() {
    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <div>
            <Diffusion/>
            <TopNavBar showSideBar={ (show) => { setShowSideBar(show) } }/>
            <SideNavBar closeSideBar={ () => { setShowSideBar(false) } } show={showSideBar}/>
            <div className="content gap-10">
                <div className="animate-fade-up">
                    <p className="subheading1">Uh oh...</p>
                    <h1>That's a 404 :0</h1>
                </div>
            </div>
        </div>
    )
}
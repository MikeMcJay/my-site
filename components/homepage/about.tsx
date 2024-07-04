'use client'

import { useEffect, useRef, useState } from "react";
import { getProfilePicture } from "../../src/scripts/about";
import useOnScreen from "../../src/scripts/detectOnScreen";

export default function AboutPanel() {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(ref)
    const [aboutPanelVisible, setAboutPanelVisible] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setAboutPanelVisible(isVisible);
        }
    }, [isVisible]);

    const [profilePictureURL, setProfilePictureURL] = useState("");
    useEffect(() => {
        getProfilePicture().then((url) => {
            setProfilePictureURL(url);
        })
    }, []);

    return (
        <div ref={ref} id="about" className={`about-panel ${aboutPanelVisible? "visible animate-fade-up": "invisible"}`}>
            <div className="welcome">
                <p className="subheading1">Hi there, I'm</p>
                <h1>MikeMcJay.</h1>
                <h3>Welcome to my site.</h3>
            </div>
            <h3>About</h3>
            <div className="about-panel-description-container">
                <div className="about-panel-description">
                    My actual name is Jason - MikeMcJay is just an alias I use for my developer accounts. I am a recent graduate
                    of <a href="https://ncl.ac.uk/" target="_blank" className="alt">Newcastle University</a> where I got my bachelor's 
                    degree in <a href="https://www.ncl.ac.uk/undergraduate/degrees/g400/" target="_blank" className="alt">Computer Science</a>. 
                    In-between playing the guitar, baking or hitting the gym I'm usually working on a new app or a website. 
                    I love the idea of creating something that a person in the real world would find useful. I try not to limit myself
                    to any particular language or toolset, learning whatever is necessary to make my ideas happen :)
                </div>
                <div className="about-panel-image-container">
                    <img
                        className="about-panel-image"
                        src={profilePictureURL}
                        alt="MikeMcJay"
                    />
                </div>
            </div>
        </div>
    )
}
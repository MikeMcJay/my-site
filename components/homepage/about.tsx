'use client'

import { useEffect, useRef, useState } from "react";
import { getProfilePicture } from "../../src/scripts/about";
import useOnScreen from "../../src/scripts/detectOnScreen";

export default function AboutPanel() {
    const refWelcome = useRef<HTMLDivElement>(null)
    const isWelcomeVisible = useOnScreen(refWelcome)
    const [welcomeVisible, setWelcomeVisible] = useState(false);
    const refAbout = useRef<HTMLDivElement>(null)
    const isAboutVisible = useOnScreen(refAbout)
    const [aboutPanelVisible, setAboutPanelVisible] = useState(false);
    const refDescription = useRef<HTMLDivElement>(null)
    const isDescriptionVisible = useOnScreen(refDescription)
    const [descriptionVisible, setDescriptionVisible] = useState(false);

    useEffect(() => {
        if (isWelcomeVisible) {
            setWelcomeVisible(true);
        }
        if (isAboutVisible) {
            setAboutPanelVisible(true);
        }
        if (isDescriptionVisible) {
            setDescriptionVisible(true);
        }
    }, [isWelcomeVisible, isAboutVisible, isDescriptionVisible]);

    const [profilePictureURL, setProfilePictureURL] = useState("");
    useEffect(() => {
        getProfilePicture().then((url) => {
            setProfilePictureURL(url);
        })
    }, []);

    return (
        <div className={"about-panel"}>
            <div ref={refWelcome} className={`welcome ${welcomeVisible? "visible animate-fade-up animate-delay-75": "invisible"}`}>
                <p className="subheading1">Hi there, I'm</p>
                <h1>MikeMcJay.</h1>
                <h3>Welcome to my site.</h3>
            </div>
            <h3 ref={refAbout} id="about" className={aboutPanelVisible? "visible animate-fade-up animate-delay-150": "invisible"}>About</h3>
            <div ref={refDescription} className={`about-panel-description-container ${descriptionVisible? "visible animate-fade-up animate-delay-200": "invisible"}`}>
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
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
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
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
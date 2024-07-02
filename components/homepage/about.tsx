'use client'

import { useEffect, useState } from "react";
import { getProfilePicture } from "../../src/scripts/about";

export default function AboutPanel() {
    const [profilePictureURL, setProfilePictureURL] = useState("");
    useEffect(() => {
        getProfilePicture().then((url) => {
            setProfilePictureURL(url);
        })
    }, []);

    return (
        <div className="about-panel">
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
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
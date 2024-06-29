'use client'

export default function AboutPanel() {
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
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="MikeMcJay"
                    />
                </div>
            </div>
        </div>
    )
}
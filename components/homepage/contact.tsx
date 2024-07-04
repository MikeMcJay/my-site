import { useEffect, useRef, useState } from "react";
import { ButtonCustom } from "../button";
import useOnScreen from "../../src/scripts/detectOnScreen";

export default function ContactPanel() {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(ref)
    const [contactPanelVisible, setContactPanelVisible] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setContactPanelVisible(isVisible);
        }
    }, [isVisible]);

    return (
        <div ref={ref} id="reach-out" className={`contact-panel ${contactPanelVisible? "visible animate-fade-up": "invisible"}`}>
            <h2>Reach out</h2>
            <p className="contact-panel-description">I'm open for work so if you have any opportunities I would be happy to hear about
                them! If you have any queries about my projects or anything else please don't hesitate to contact me too :)
            </p>
            <div className="contact-panel-socials">
                <a href="https://www.linkedin.com/in/jason-michael-mcneill/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
                <a href="mailto:contact@mikemcjay.com">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                    </svg>                  
                </a>
            </div>
        </div>
    )
}
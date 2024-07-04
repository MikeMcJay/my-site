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
            <p className="contact-panel-description">Reasons why you can get in touch with me. What I might be able to offer you and
                all that other good stuff. Some more stuff too.
            </p>
            <ButtonCustom onClick={() => {}}>Contact me</ButtonCustom>
        </div>
    )
}
import { useEffect, useRef, useState } from "react";
import useOnScreen from "../src/scripts/detectOnScreen";

export function Footer() {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(ref)
    const [footerVisible, setFooterVisible] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setFooterVisible(isVisible);
        }
    }, [isVisible]);
    const currentYear = new Date().getFullYear()

    return (
        <div ref={ref} className={`footer ${footerVisible? "visible animate-fade": "invisible"}`}>
            <p className="caption">MikeMcJay {currentYear} | Made by me :O</p>
        </div>
    )
}
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
            <p className="caption">MikeMcJay {currentYear} | <a href="https://github.com/MikeMcJay/my-site" className="alt" target="_blank">Made by me :O</a></p>
        </div>
    )
}
'use client'

import "../styles/components/progressBar.css";

import { useEffect, useState } from "react";
import { useScrollDirection } from "../src/scripts/detectScroll";
import confetti from "canvas-confetti";

export function ProgressBar({
    enabled = false
} : {
    enabled: boolean
}) {
    const scrollDirection = useScrollDirection();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [celebrated, setCelebrated] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const totalHeight = scrollHeight - clientHeight;
            const progress = (scrollTop / totalHeight) * 100;
            setScrollProgress(progress);
        }
        window.addEventListener("scroll", checkScroll);
    }, []);

    useEffect(() => {
        if (scrollProgress === 100 && enabled && !celebrated) {
            confetti({
                particleCount: Math.floor(Math.random() * 100) + 50,
                spread: 160,
                origin: { x: 0.5, y: 1 }
            });
            setCelebrated(true);
        }
    }, [scrollProgress, enabled, celebrated]);

    if (!enabled) {
        return null;
    }

    return (
        <div>
            <div className={`progress-bar ${(scrollDirection === "up")? "opacity-0" : "opacity-100"}`}></div>
            <div className={`progress-bar-overlay ${(scrollDirection === "up")? "opacity-0" : "opacity-100"}`} style={{width: scrollProgress + "%"}}></div>
        </div>
    )
}
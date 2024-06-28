'use client'

import { ReactNode } from "react"

export function Subheading({ 
    children,
    className = "subheading1"
} : { 
    children: ReactNode,
    className?: "subheading1" | "subheading2"
}) {
    return (
        <p className={className}>{children}</p>
    )
}
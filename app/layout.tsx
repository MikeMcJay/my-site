import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"
import configuration from '../src/config';
import { ReactNode } from "react"

import './globals.css'

configuration

export default function RootLayout({
    children,
  }: {
    children: ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
}

// Useful for getting details on the current tailwind setup
export const fullConfig = resolveConfig(tailwindConfig);
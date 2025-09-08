"use client"

import configuration from '../src/config';
import { ReactNode } from "react"

import './globals.css'

configuration

// Customised console message
console.log("\n" + 
    "%cWelcome to MikeMcJay!\n" + 
    "\n" + "\x1B[m" + 
    "Decided to go sneaking around in the console to see what you can find 👀? It's dangerous to go alone so take this 🗡️." +
    "\n\n" + "👉 Source code for this site: https://github.com/MikeMcJay/my-site",
    "font-size: 2em;"
);

export default function RootLayout({
    children,
  }: {
    children: ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/static/favicon.svg" sizes="any" />
          <title>MikeMcJay</title>
        </head>
        <body>{children}</body>
      </html>
    )
}
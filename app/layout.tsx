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
        <head>
          <link rel="icon" href="/static/favicon.svg" sizes="any" />
          <title>MikeMcJay</title>
        </head>
        <body>{children}</body>
      </html>
    )
}
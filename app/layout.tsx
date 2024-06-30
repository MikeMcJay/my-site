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
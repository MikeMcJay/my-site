import { Timestamp } from "firebase/firestore"

export type Project = {
    isMarkdown: boolean,
    markdown: string,
    details: string,
    isHighlight: boolean,
    labels: string[],
    links: string[],
    started: Timestamp,
    end?: Timestamp | null
    subtitle: string,
    title: string
}
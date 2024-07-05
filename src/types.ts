import { Timestamp } from "firebase/firestore"

export type Project = {
    details: string,
    isHighlight: boolean,
    labels: string[],
    links: string[],
    started: Timestamp,
    end?: Timestamp | null
    subtitle: string,
    title: string
}
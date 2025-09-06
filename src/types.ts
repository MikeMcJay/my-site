import { Timestamp } from "firebase/firestore"

export type Project = {
    sceneSettings?: SceneSettings,
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

export type SceneSettings = {
    physicalMesh?: PhysicalMesh,
    directionalLight?: DirectionLight,
    modelColour?: string,
    modelPosition: ModelPosition,
    modelScale: ModelScale,
    modelRotation: ModelRotation,
    cameraPosition: CameraPosition,
    controls: Controls
}

export type PhysicalMesh = {
    clearcoatRoughness: number,
    reflectivity: number,
    roughness: number
}

export type DirectionLight = {
    intensity: number,
    x: number,
    y: number,
    z: number,
}

export type Controls = {
    minDistance: number,
    maxDistance: number,
    enablePan: boolean,
    enableDamping: boolean,
    dampingFactor: number
}

export type CameraPosition = {
    x: number,
    y: number,
    z: number
}

export type ModelPosition = {
    x: number,
    y: number,
    z: number
}

export type ModelScale = {
    x: number,
    y: number,
    z: number
}

export type ModelRotation = {
    x: number,
    y: number,
    z: number
}
import { useEffect, useRef, useState } from "react";
import { getFileNameExtension, getFileNameWithoutExtension } from "../../src/scripts/projects";
import ThreeScene from "../threeScene";
import { SceneSettings } from "../../src/types";

import "../../styles/components/progressBar.css";

export default function ImageCarousel({
    projectFiles,
    sceneSettings
} : {
    projectFiles: Map<string, string>,
    sceneSettings?: SceneSettings
}) {
    if (!projectFiles) {
        return null;
    }

    const [selectedFile, setSelectedFile] = useState(Array.from(projectFiles)[0]);
    const [selected, setSelected] = useState({counter: 0, index: 0});
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (projectFiles) {
            projectFiles.forEach((url, file) => {
                if (getFileNameWithoutExtension(file) === "banner") {
                    setSelectedFile([file, url]);
                }
            });
        }
    }, [projectFiles]);

    useEffect(() => {
        let index = 0;
        Array.from(projectFiles).map((file, i) => {
            if (file[0] === selectedFile[0]) {
                index = i;
            }
        });
        let counter = 0;
        let interval = 10;
        let delay = 5000;
        if (autoPlay) {
            const id = setInterval(() => {
                if (counter === delay) {
                    // Once we reach the end of the delay, move to the next selected image (we are ignoring other file types)
                    counter = 0;
                    while (getFileNameExtension(Array.from(projectFiles)[index % projectFiles.size][0].toLowerCase()) === ".mp4"
                        || getFileNameExtension(Array.from(projectFiles)[index % projectFiles.size][0].toLowerCase()) === ".obj") {
                            index++;
                    }
                    setSelectedFile(Array.from(projectFiles)[index % projectFiles.size]);
                    index++
                } else {
                    // Increase the counter to show the time progress
                    counter += interval;
                    setSelected({index, counter});
                }
            }, interval);
            return () => clearInterval(id);
        }
    }, [autoPlay]);

    return (
        <div className="image-carousel">
            {(getFileNameExtension(selectedFile[0]).toLowerCase() === ".jpg" 
            || (getFileNameExtension(selectedFile[0]).toLowerCase() === ".png")
            || (getFileNameExtension(selectedFile[0]).toLowerCase() === ".jpeg")
            ) && <SelectedImage 
                projectFiles={projectFiles}
                selectedImage={selectedFile[0]}
                onClickSetSelectedImage={(selectedImage) => {
                    setSelectedFile(selectedImage);
                    setAutoPlay(false);
                }}
            />}
            {(getFileNameExtension(selectedFile[0]).toLowerCase() === ".mp4") && <SelectedVideo 
                projectFiles={projectFiles}
                selectedVideo={selectedFile[0]}
                onClickSetSelectedVideo={(selectedVideo) => {
                    setSelectedFile(selectedVideo);
                    setAutoPlay(false);
                }}
                onPlayVideo={() => { setAutoPlay(false) }}
            />}
            {sceneSettings && (getFileNameExtension(selectedFile[0]).toLowerCase() === ".obj" && <SelectedThreeScene
                projectFiles={projectFiles}
                selectedModel={selectedFile[0]}
                sceneSettings={sceneSettings}
                onClickSetSelectedScene={(selectedScene) => {
                    setSelectedFile(selectedScene);
                    setAutoPlay(false);
                }}
            />)}
            <div className="image-carousel-queued-scroll">
                <div className="image-carousel-queued-container">
                    {Array.from(projectFiles).map((file => {
                        // For images
                        if (getFileNameExtension(file[0]).toLowerCase() === ".png" 
                        || getFileNameExtension(file[0]).toLowerCase() === ".jpg"
                        || getFileNameExtension(file[0]).toLowerCase() === ".jpeg") {
                            return (
                                <div
                                    key={file[0]}
                                    onClick={() => { 
                                        setSelectedFile(file)
                                        if (file[0] !== selectedFile[0]) {
                                            setAutoPlay(false);
                                        }
                                    }}
                                    className={`image-carousel-thumbnail-image ${(file[0] === selectedFile[0])? "image-carousel-thumbnail-image-selected" : ""}`}
                                    style={{ backgroundImage: `url(${file[1]})` }}
                                >
                                    {file[0] === selectedFile[0] && <AutoPlay
                                        autoPlay={autoPlay}
                                        progress={((selected.counter / 5000) * 100)}
                                        onClickAutoplay={() => {
                                            setAutoPlay(!autoPlay)
                                        }}
                                    />}
                                </div>
                            )
                        }
                        // For video
                        if (getFileNameExtension(file[0]).toLowerCase() === ".mp4") {
                            return (
                                <div
                                    key={file[0]}
                                    onClick={() => { 
                                        setSelectedFile(file);
                                        setAutoPlay(false);
                                    }}
                                    className={`image-carousel-thumbnail-video ${(file[0] === selectedFile[0])? "image-carousel-thumbnail-video-selected" : ""}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-24 m-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>
                                    </svg>                          
                                </div>
                            )
                        }
                        // For three.js models
                        if (getFileNameExtension(file[0]).toLowerCase() === ".obj" && sceneSettings) {
                            return (
                                <div
                                    key={file[0]}
                                    onClick={() => { 
                                        setSelectedFile(file);
                                        setAutoPlay(false);
                                    }}
                                    className={`image-carousel-thumbnail-video ${(file[0] === selectedFile[0])? "image-carousel-thumbnail-video-selected" : ""}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-24 m-auto" viewBox="0 -960 960 960" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M440-181 240-296q-19-11-29.5-29.5T200-365v-230q0-21 10.5-39.5T240-664l200-115q19-11 40-11t40 11l200 115q19 11 29.5 29.5T760-595v230q0 21-10.5 39.5T720-296L520-181q-19 11-40 11t-40-11ZM120-640q-17 0-28.5-11.5T80-680v-120q0-33 23.5-56.5T160-880h120q17 0 28.5 11.5T320-840q0 17-11.5 28.5T280-800H160v120q0 17-11.5 28.5T120-640Zm40 560q-33 0-56.5-23.5T80-160v-120q0-17 11.5-28.5T120-320q17 0 28.5 11.5T160-280v120h120q17 0 28.5 11.5T320-120q0 17-11.5 28.5T280-80H160Zm640 0H680q-17 0-28.5-11.5T640-120q0-17 11.5-28.5T680-160h120v-120q0-17 11.5-28.5T840-320q17 0 28.5 11.5T880-280v120q0 33-23.5 56.5T800-80Zm0-600v-120H680q-17 0-28.5-11.5T640-840q0-17 11.5-28.5T680-880h120q33 0 56.5 23.5T880-800v120q0 17-11.5 28.5T840-640q-17 0-28.5-11.5T800-680Zm-478 61-42 24v45l160 93v184l40 23 40-23v-184l160-93v-45l-42-24-158 93-158-93Z"/></svg>
                                </div>
                            )
                        }
                    }))}
                </div>
            </div>
        </div>
    )
}

function SelectedImage({
    projectFiles,
    selectedImage,
    onClickSetSelectedImage
} : {
    projectFiles: Map<string, string>,
    selectedImage: string,
    onClickSetSelectedImage: (selectedImage: [string, string]) => void
}) {
    return (
        <div
            className="group image-carousel-selected-file"
            style={{ backgroundImage: `url(${projectFiles.get(selectedImage)})` }}
        >
            <CarouselControls
                onClickLast={() => {
                    Array.from(projectFiles).map((image, index) => {
                        if (image[0] === selectedImage) {
                            var newIndex = (index - 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
                onClickNext={() => {
                    Array.from(projectFiles).map((image, index) => {
                        if (image[0] === selectedImage) {
                            var newIndex = (index + 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
            />
        </div>  
    )
}

function SelectedThreeScene({
    projectFiles,
    selectedModel,
    sceneSettings,
    onClickSetSelectedScene
} : {
    projectFiles: Map<string, string>,
    selectedModel: string,
    sceneSettings: SceneSettings,
    onClickSetSelectedScene: (selectedScene: [string, string]) => void
}) {
    const imageCarouselContainer = useRef<HTMLDivElement>(null);

    return (
        <div className="group image-carousel-selected-file" ref={imageCarouselContainer}>
            <ThreeScene
                imageCarouselRef={imageCarouselContainer}
                model={projectFiles.get(selectedModel)}
                sceneSettings={sceneSettings}
            />
            <CarouselControls
                onClickLast={() => {
                    Array.from(projectFiles).map((image, index) => {
                        if (image[0] === selectedModel) {
                            var newIndex = (index - 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedScene(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
                onClickNext={() => {
                    Array.from(projectFiles).map((image, index) => {
                        if (image[0] === selectedModel) {
                            var newIndex = (index + 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedScene(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
            />
        </div>
    )
}

function SelectedVideo({
    projectFiles,
    selectedVideo,
    onClickSetSelectedVideo,
    onPlayVideo
} : {
    projectFiles: Map<string, string>,
    selectedVideo: string,
    onClickSetSelectedVideo: (selectedVideo: [string, string]) => void,
    onPlayVideo
}) {
    return (
        <div
            className="group image-carousel-selected-file"
        >
            <video onPlay={onPlayVideo} className="image-carousel-video" autoPlay controls>
                <source src={projectFiles.get(selectedVideo)}/>
            </video>
            <CarouselControls
                onClickLast={() => {
                    Array.from(projectFiles).map((video, index) => {
                        if (video[0] === selectedVideo) {
                            var newIndex = (index - 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedVideo(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
                onClickNext={() => {
                    Array.from(projectFiles).map((video, index) => {
                        if (video[0] === selectedVideo) {
                            var newIndex = (index + 1) % projectFiles.size
                            if (newIndex < 0) {
                                newIndex += projectFiles.size
                            }
                            onClickSetSelectedVideo(Array.from(projectFiles)[newIndex]);
                        }
                    });
                }}
            />
        </div>
    )
}

function CarouselControls({
    onClickNext,
    onClickLast
} : {
    onClickNext: () => void,
    onClickLast: () => void
}) {
    return (
        <div className="image-carousel-controls">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" 
                className="image-carousel-next-image-left group-hover:opacity-100"
                onClick={onClickLast}
            >
                <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" 
                className="image-carousel-next-image-right group-hover:opacity-100"
                onClick={onClickNext}
            >
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </div>
    )
}

function AutoPlay({
    autoPlay,
    progress,
    onClickAutoplay,
} : {
    autoPlay: boolean,
    progress: number,
    onClickAutoplay: (boolean) => void,
}) {
    if (autoPlay) {
        return (
            <div className="flex justify-center items-center w-full h-full bg-black/50">
                {/* <div className="progress-bar-image-carousel" style={{width: progress + "%"}}></div> */}
                <div className="w-auto h-50 bg-gray-100 rounded-full stroke-width stroke-black" onClick={onClickAutoplay}>
                    <svg className="size-14 fill-black" viewBox="0 -960 960 960">
                        <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/>
                    </svg>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center w-full h-full bg-black/50">
                <div className="w-auto h-50 bg-gray-100 rounded-full stroke-width stroke-black" onClick={onClickAutoplay}>
                    <svg className="size-14 fill-black" viewBox="0 -960 960 960">
                        <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>
                    </svg>
                </div>
            </div>

        )
    }
}
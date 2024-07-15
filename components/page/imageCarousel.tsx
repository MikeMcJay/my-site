import { useEffect, useState } from "react";
import { getFileNameExtension, getFileNameWithoutExtension } from "../../src/scripts/projects";

export default function ImageCarousel({
    projectFiles
} : {
    projectFiles: Map<string, string>
}) {
    if (!projectFiles) {
        return null;
    }

    const [selectedFile, setSelectedFile] = useState(Array.from(projectFiles)[0][0]);

    useEffect(() => {
        if (projectFiles) {
            projectFiles.forEach((url, file) => {
                if (getFileNameWithoutExtension(file) === "banner") {
                    setSelectedFile(file);
                }
            });
        }
    }, [projectFiles]);

    return (
        <div className="image-carousel">
            {(getFileNameExtension(selectedFile) === ".jpg" 
            || (getFileNameExtension(selectedFile) === ".png")
            || (getFileNameExtension(selectedFile) === ".jpeg")
            ) && <SelectedImage 
                projectFiles={projectFiles}
                selectedImage={selectedFile}
                onClickSetSelectedImage={(selectedImage) => {
                    setSelectedFile(selectedImage);
                }}
            />}
            {(getFileNameExtension(selectedFile) === ".mp4") && <SelectedVideo 
                projectFiles={projectFiles}
                selectedVideo={selectedFile}
                onClickSetSelectedImage={(selectedImage) => {
                    setSelectedFile(selectedImage);
                }}
            />}
            <div className="image-carousel-queued-scroll">
                <div className="image-carousel-queued-container">
                    {Array.from(projectFiles).map((file => {
                        // For images
                        if (getFileNameExtension(file[0]) === ".png" 
                        || getFileNameExtension(file[0]) === ".jpg"
                        || getFileNameExtension(file[0]) === ".jpeg") {
                            return (
                                <div
                                    onClick={() => { setSelectedFile(file[0]) }}
                                    className={`image-carousel-thumbnail-image ${(file[0] === selectedFile)? "image-carousel-thumbnail-image-selected" : ""}`}
                                    style={{ backgroundImage: `url(${file[1]})` }}
                                />
                            )
                        }
                        // For video
                        if (getFileNameExtension(file[0]) === ".mp4") {
                            return (
                                <div
                                    onClick={() => { setSelectedFile(file[0]) }}
                                    className={`image-carousel-thumbnail-video ${(file[0] === selectedFile)? "image-carousel-thumbnail-video-selected" : ""}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-24 m-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>
                                    </svg>                                
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
    onClickSetSelectedImage: (string) => void
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
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex][0]);
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
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex][0]);
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
    onClickSetSelectedImage
} : {
    projectFiles: Map<string, string>,
    selectedVideo: string,
    onClickSetSelectedImage: (string) => void
}) {
    return (
        <div
            className="group image-carousel-selected-file"
        >
            <video className="image-carousel-video" autoPlay controls>
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
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex][0]);
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
                            onClickSetSelectedImage(Array.from(projectFiles)[newIndex][0]);
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
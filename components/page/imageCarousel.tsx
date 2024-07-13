import { useEffect, useState } from "react";
import { ButtonCustom } from "../button";

export default function ImageCarousel({
    projectImages
} : {
    projectImages: Map<string, string>
}) {
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (projectImages) {
            if (projectImages.has("banner")) {
                // Set the banner as the first pic if it is available
                setSelectedImage("banner");
            } else {
                // Otherwise use the first image in the map
                setSelectedImage(Array.from(projectImages)[0][0]);
            }
        }
    }, [projectImages]);

    if (!projectImages) {
        return null;
    }

    return (
        <div className="image-carousel">
            <div
                className="group image-carousel-selected-image"
                style={{ backgroundImage: `url(${projectImages.get(selectedImage)})` }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" 
                    className="image-carousel-next-image-left group-hover:visible"
                    onClick={() => {
                        Array.from(projectImages).map((image, index) => {
                            if (image[0] === selectedImage) {
                                var newIndex = (index - 1) % projectImages.size
                                if (newIndex < 0) {
                                    newIndex += projectImages.size
                                }
                                setSelectedImage(Array.from(projectImages)[newIndex][0]);
                            }
                        });
                    }}
                >
                    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" 
                    className="image-carousel-next-image-right group-hover:visible"
                    onClick={() => {
                        Array.from(projectImages).map((image, index) => {
                            if (image[0] === selectedImage) {
                                var newIndex = (index + 1) % projectImages.size
                                if (newIndex < 0) {
                                    newIndex += projectImages.size
                                }
                                setSelectedImage(Array.from(projectImages)[newIndex][0]);
                            }
                        });
                    }}
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
            <div className="image-carousel-queued-scroll">
                <div className="image-carousel-queued-container">
                    {Array.from(projectImages).map((image => {
                        return (
                            <div
                                onClick={() => { setSelectedImage(image[0]) }}
                                className={`image-carousel-thumbnail ${(image[0] === selectedImage)? "image-carousel-thumbnail-selected" : ""}`}
                                style={{ backgroundImage: `url(${image[1]})` }}
                            ></div>
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}
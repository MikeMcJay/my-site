import { useEffect, useState } from "react";

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
                className="image-carousel-selected-image"
                style={{ backgroundImage: `url(${projectImages.get(selectedImage)})` }}
            />
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
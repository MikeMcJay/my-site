import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

// Useful for getting details on the current tailwind setup
const fullConfig = resolveConfig(tailwindConfig);

export function Tag({
    tagID,
    tagName
}: {
    tagID: string
    tagName: string
}) {
    const [tagNameColour, setTagNameColour] = useState("#ffffff");
    const [tagBackgroundColour, setTagBackgroundColour] = useState("#ffffff");
    useEffect(() => {
        setTagNameColour(getColour(tagID, false));
        setTagBackgroundColour(getColour(tagID, true));
    }, []);

    return (
        <div>
            <div className="tag-container" style={{ backgroundColor: tagBackgroundColour }}>
                <p className="" style={{ color: tagNameColour }}>{tagName}</p>
            </div>
        </div>
    )
}

function getColour(tagID: string, dark: boolean) {
    var tagColour = "#ffffff";
    const colors = fullConfig.theme.colors;
    Object.entries(colors).map((colour) => {
        if (tagID === colour[0]) {
            Object.entries(colour[1]).map((variant) => {
                const tagShade = dark? "200" : "50";
                if (tagShade === variant[0]) {
                    tagColour = variant[1]
                }
            })
        }
    })
    return tagColour;
}
import { useEffect, useState } from "react";
import { fullConfig } from "../app/layout";

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
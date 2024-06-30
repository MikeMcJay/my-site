export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="footer">
            <p className="caption">MikeMcJay {currentYear}</p>
        </div>
    )
}
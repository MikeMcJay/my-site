export function Diffusion() {
    return (
        <div className="absolute overflow-hidden h-full w-full">
            <div className="
                absolute
                rotate-45
                top-0
                left-0
                md:-translate-x-96
                md:-translate-y-128
                rounded-full
                h-96 w-96
                md:h-full md:w-full
                opacity-15
                animate-diffuse
                " 
                style={{ backgroundImage: "radial-gradient(circle, rgba(43,109,152,1) 0%, rgba(59,140,193,1) 50%, rgba(37,172,199,0) 100%)" }}>
            </div>
        </div>
    )
}
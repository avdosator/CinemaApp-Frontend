import "./CinebhLogo.css"

type CinebhLogoProps = {
    isRed: boolean
}

export default function CinebhLogo({ isRed }: CinebhLogoProps) {
    return (
        <>
            <div className="logo-icon">
                <img src="https://placehold.co/26x24" alt="Cinebh Icon" />
            </div>
            <div className="logo-text">Cine<span style={isRed ? { color: "#B22222" } : {}}>bh.</span></div>
        </>
    )
}
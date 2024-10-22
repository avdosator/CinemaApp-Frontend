import "./MovieCard.css"

export default function MovieCard() {
    return (
        <>
            <div className="movie-card">
                <img src="https://placehold.co/270x287" alt="Movie Poster" className="movie-card-image" />
                <div className="movie-card-content">
                    <h5 className="movie-card-header">Avatar</h5>
                    <div className="movie-card-details">
                        <span>117 MIN</span>
                        <div className="movie-card-separator"></div>
                        <span>Fantasy</span>
                    </div>
                </div>
            </div>
        </>
    )
}
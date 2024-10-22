import "./VenueCard.css"

export default function MovieCard() {
    return (
        <>
            <div className="movie-card">
                <img src="https://placehold.co/270x287" alt="Venue Poster" className="movie-card-image" />
                <div className="movie-card-content">
                    <h5 className="movie-card-header">Cineplex</h5>
                    <div className="movie-card-details">
                        <div>Zmaja od Bosne 4, Sarajevo 71000</div>
                    </div>
                </div>
            </div>
        </>
    )
}
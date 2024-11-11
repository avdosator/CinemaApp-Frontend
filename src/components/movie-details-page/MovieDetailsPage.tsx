export default function MovieDetailsPage() {
    return (
        <div>
            <h1>Movie Details</h1>
            <section className="video-photo-container">
                <div className="video-container">

                </div>
                <div className="movie-photos-container">

                </div>
            </section>
            <section className="movie-info-ticket-container">
                <div className="movie-info-container">
                    <h2>Avatar</h2>
                    <div>
                        <span>PG rating</span>
                        <span>language</span>
                        <span>duration</span>
                        <span>Projection date: yyyy/MM/dd - yyyy/MM/dd</span>
                    </div>
                    <div>
                        genres.map(genre = (GenreBadge) )
                    </div>
                    <p className="movie-synopsis">Synopsis</p>
                    <div className="movie-director">
                        Director
                    </div>
                    <div className="writers-container">
                        Writers
                    </div>
                    <div className="actors-container">
                        <h3>Cast</h3>
                        <div>Actors.map</div>
                    </div>
                </div>
                <div className="movie-ticket-container">

                </div>
            </section>
            <section className="movie-rating-container">
                <h3>Rating</h3>
                <div>imdb rating badge</div>
                <div>rt rating badge</div>
            </section>
            <section className="movie-card-small-list">

            </section>
        </div>
    )
}
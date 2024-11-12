import PaginationSmall from "../shared-components/pagination/PaginationSmall";

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
                    <p className="movie-synopsis font-lg-regular" style={{color: "#1D2939"}}>Synopsis</p>
                    <div className="movie-director">
                        Director
                    </div>
                    <div className="writers-container font-lg-regular">
                        <span style={{color: "667085"}}>Writers:</span>
                        <span style={{ color: "#1D2939"}}> James Cameron, Cameron James</span>
                    </div>
                    <div className="actors-container">
                        <h6 className="font-heading-h6" style={{color: "#667085"}}>Cast</h6>
                        <div>Actors.map</div>
                    </div>
                </div>
                <div className="movie-ticket-container">

                </div>
            </section>
            <section className="movie-rating-container">
                <h6 className="font-heading-h6" style={{color: "#667085"}}>Rating</h6>
                <div>imdb rating badge</div>
                <div>rt rating badge</div>
            </section>
            <section className="movie-card-small-list">
                <h5 className="font-heading-h6" style={{color: "#1D2939"}}>See also</h5>
                <div>cardlist</div>
                <PaginationSmall />
            </section>
        </div>
    )
}
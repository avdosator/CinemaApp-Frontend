import VerticalDivider from "../shared-components/divider/VerticalDivider";
import PaginationSmall from "../shared-components/pagination/PaginationSmall";
import MovieRatingBadge from "./movie-rating-badge/MovieRatingBadge";
import TicketForm from "./ticket-form/TicketForm";

export default function MovieDetailsPage() {
    return (
        <div className="movie-details">
            <h5 className="font-heading-h5" style={{ color: "#1D2939" }}>Movie Details</h5>
            <section className="video-photo-container">
                <div className="video-container">

                </div>
                <div className="movie-photos-container">

                </div>
            </section>
            <section className="movie-info-ticket-container">
                <div className="movie-info-container">
                    <h4 className="font-heading-h4" style={{ color: "#1D2939" }}>Avatar</h4>
                    <div className="font-lg-regular" style={{ color: "#1D2939" }}>
                        <span>PG rating</span>
                        <VerticalDivider />
                        <span>language</span>
                        <VerticalDivider />
                        <span>duration</span>
                        <VerticalDivider />
                        <span>Projection date: yyyy/MM/dd - yyyy/MM/dd</span>
                    </div>
                    <div>
                        genres.map(genre = (GenreBadge) )
                    </div>
                    <p className="movie-synopsis font-lg-regular" style={{ color: "#1D2939" }}>
                        Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what
                        was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home. Several years
                        after the Na'vi repelled the RDA invasion Jake Sully and his family are living on Pandora. Things seem peaceful but
                        the RDA has other plans, invading and capturing Pandora. Sully forms a guerrilla group to try to expel the invaders.
                    </p>
                    <div className="movie-director" style={{ color: "#667085" }}>
                        Director
                        <span style={{ color: "#1D2939" }}>Director name</span>
                    </div>
                    <div className="writers-container font-lg-regular" style={{ color: "667085" }}>
                        Writers: writers.map
                        <span style={{ color: "#1D2939" }}> James Cameron, Cameron James</span>
                    </div>
                    <div className="actors-container">
                        <VerticalDivider width="24px" border="1.5px solid #B22222" />
                        <h6 className="font-heading-h6" style={{ color: "#667085" }}>Cast</h6>
                        <div>Actors.map(div actor)</div>
                    </div>
                </div>
                <div className="ticket-container">
                    <TicketForm />
                </div>
            </section>
            <section className="movie-rating-container">
                <VerticalDivider width="24px" border="1.5px solid #B22222" />
                <h6 className="font-heading-h6" style={{ color: "#667085" }}>Rating</h6>
                <MovieRatingBadge rating={9.5} label="IMDB Rating" />
                <MovieRatingBadge rating={8.2} label="Rotten Tomatoes" />
            </section>
            <section className="movie-card-small-list">
                <h5 className="font-heading-h6" style={{ color: "#1D2939" }}>See also</h5>
                <div>cardlist</div>
                <PaginationSmall />
            </section>
        </div>
    )
}
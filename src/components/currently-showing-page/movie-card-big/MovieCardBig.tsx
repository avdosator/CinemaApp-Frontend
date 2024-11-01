import "./MovieCardBig.css"
import GenreBadge from "../../shared-components/genre-badge/GenreBadge";
import TimeBadge from "../../shared-components/time-badge/TimeBadge";

export default function MovieCardBig() {
    const showtimes = ["12:00", "14:00", "16:00", "18:00", "20:00"];
    const genres = ["Fantasy", "Action", "Adventure", "Sci Fi",];

    return (
        <div className="movie-card-big">
            <section className="movie-card-big-left">
                <img src="https://placehold.co/270x287" alt="" className="movie-card-big-img" />
                <div className="movie-card-big-info">
                    <h4 className="movie-card-big-title font-heading-h4">Inception</h4>
                    <div className="movie-card-big-data">
                        <span className="body-lg-regular">PG-13</span>
                        <div className="divider"></div>
                        <span className="body-lg-regular">English</span>
                        <div className="divider"></div>
                        <span className="body-lg-regular">117 Min</span>
                    </div>
                    <div className="movie-card-big-genre-container">
                        {genres.map((genre, index) => (
                            <GenreBadge key={index} label={genre} />
                        ))}
                    </div>
                    <p className="font-md-italic-regular">Playing in cinema until 14.09.2024.</p>
                </div>
            </section>
            <section className="movie-card-big-right">
                <h6 className="movie-card-big-showtime-label font-heading-h6">Showtimes</h6>
                <div className="movie-card-big-showtime-badges">
                    {showtimes.map((item, index) => (
                        <TimeBadge key={index} label={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}
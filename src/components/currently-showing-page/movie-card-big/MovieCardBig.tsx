import "./MovieCardBig.css"
import GenreBadge from "../../shared-components/genre-badge/GenreBadge";
import TimeBadge from "../../shared-components/time-badge/TimeBadge";
import { Movie } from "../../../types/Movie";
import { useState } from "react";

export default function MovieCardBig({ movie }: { movie: Movie }) {
    const [selectedTime, setSelectedTime] = useState<string | null>(null); // Track selected time

    const handleTimeSelection = (time: string) => {
        setSelectedTime(time);
    };

    // Find the latest date of all movie projections
    const latestEndDate: Date = movie.projections.reduce((latest, projection) => {
        return projection.endDate.toString() > latest.endDate.toString() ? projection : latest;
    }).endDate;

    // Convert to "DD.MM.YYYY" format
    const formattedDate = latestEndDate.toString().split("-").reverse().join(".");

    // Find the latest date of all movie projections
    const latestEndDate: Date = movie.projections.reduce((latest, projection) => {
        return projection.endDate.toString() > latest.endDate.toString() ? projection : latest;
    }).endDate;

    // Convert to "DD.MM.YYYY" format
    const formattedDate = latestEndDate.toString().split("-").reverse().join(".");

    return (
        <div className="movie-card-big">
            <section className="movie-card-big-left">
                <img src={movie.photos[0].url} alt="" className="movie-card-big-img" />
                <div className="movie-card-big-info">
                    <h4 className="movie-card-big-title font-heading-h4">{movie.title}</h4>
                    <div className="movie-card-big-data">
                        <span className="body-lg-regular">{movie.pgRating}</span>
                        <div className="divider"></div>
                        <span className="body-lg-regular">{movie.language}</span>
                        <div className="divider"></div>
                        <span className="body-lg-regular">{movie.durationInMinutes} Min</span>
                    </div>
                    <div className="movie-card-big-genre-container">
                        {movie.genres.map((genre, index) => (
                            <GenreBadge key={index} label={genre.name} />
                        ))}
                    </div>
                    <p className="font-md-italic-regular">{`Playing in cinema until ${formattedDate}`}</p>
                </div>
            </section>
            <section className="movie-card-big-right">
                <h6 className="movie-card-big-showtime-label font-heading-h6">Showtimes</h6>
                <div className="movie-card-big-showtime-badges">
                    {/* Create Set (remove duplicates) from all projection times and convert it to array */}
                    {[...new Set(movie.projections.flatMap(projection => projection.startTime))]
                        .sort((a, b) => a.localeCompare(b)) // Sort the times in ascending order
                        .map((time, index) => (
                            <TimeBadge key={index} label={time} isSelected={time === selectedTime} onClick={() => handleTimeSelection(time)} />
                        ))}
                </div>
            </section>
        </div>
    )
}
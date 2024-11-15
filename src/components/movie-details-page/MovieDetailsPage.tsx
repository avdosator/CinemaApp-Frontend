import "./MovieDetailsPage.css"
import { useParams } from "react-router-dom";
import VerticalLine from "../shared-components/divider/VerticalLine";
import MovieCardSmallList from "./movie-card-small-list/MovieCardSmallList";
import MovieRatingBadge from "./movie-rating-badge/MovieRatingBadge";
import TicketForm from "./ticket-form/TicketForm";
import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import ApiService from "../../service/ApiService";
import GenreBadge from "../shared-components/genre-badge/GenreBadge";

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        if (id) {
            ApiService.get<Movie>(`/movies/${id}`)
                .then(response => setMovie(response))
                .catch(error => console.error("Error fetching movie", error));
        }
    }, [id]);

    return (
        <div className="movie-details">
            <h5 className="font-heading-h5 movie-details-heading">Movie Details</h5>
            {movie && (
                <>
                    <section className="video-photo-container">
                        <div className="video-container">
                            <iframe
                                id="movie-trailer"
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${movie.trailerUrl.slice(32)}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            >
                            </iframe>
                        </div>
                        <div className="movie-photos-container">
                            {movie?.photos.map(photo => (<img key={photo.id} src={photo.url} className="movie-details-image"></img>))}
                        </div>
                    </section>
                    <section className="movie-info-ticket-container">
                        <div className="movie-info-container">
                            <h4 className="font-heading-h4" style={{ color: "#1D2939" }}>{movie?.title}</h4>
                            <div className="font-lg-regular basic-movie-info">
                                <span>{movie?.pgRating}</span>
                                <VerticalLine />
                                <span>{movie?.language}</span>
                                <VerticalLine />
                                <span>{`${movie?.durationInMinutes} Min`}</span>
                                <VerticalLine />
                                <span>{`Projection date: ${movie?.projections[0].startDate} - ${movie?.projections[0].endDate}`}</span>
                            </div>
                            <div className="movie-genres-container">
                                {movie?.genres.map(genre => (<GenreBadge key={genre.id} label={genre.name} />))}
                            </div>
                            <p className="movie-synopsis font-lg-regular" style={{ color: "#1D2939" }}>
                                {movie?.synopsis}
                                {/* Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what
                                was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home. Several years
                                after the Na'vi repelled the RDA invasion Jake Sully and his family are living on Pandora. Things seem peaceful but
                                the RDA has other plans, invading and capturing Pandora. Sully forms a guerrilla group to try to expel the invaders. */}
                            </p>
                            <div className="movie-director" style={{ color: "#667085" }}>
                                Director:
                                <span style={{ color: "#1D2939" }}>{movie?.director}</span>
                            </div>
                            <div className="writers-container font-lg-regular" style={{ color: "#667085" }}>
                                Writers: {movie?.writers.map((writer, index) => (
                                    (<span key={index} style={{ color: "#1D2939" }}>
                                        {writer}{index < movie.writers.length - 1 ? ', ' : ''}
                                    </span>)
                                ))}
                            </div>
                            <div className="actors-container">
                                <div className="actors-heading">
                                    <VerticalLine width="1px" height="24px" />
                                    <h6 className="font-heading-h6" style={{ color: "#667085" }}>Cast</h6>
                                </div>
                                <div className="movie-actors">
                                    {movie?.actors.map((actor, index) => {
                                        const [name, movieName] = actor.split("/")
                                        return (
                                            <div key={index} className="movie-actor">
                                                <div className="font-md-semibold" style={{ color: "#101828" }}>{name}</div>
                                                <div className="font-sm-regular" style={{ color: "#667085" }}>{movieName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="ticket-container">
                            <TicketForm movie={movie} />
                        </div>
                    </section>
                    <section className="movie-rating-container">
                        <div className="ratings-heading">
                            <VerticalLine width="1px" height="24px" />
                            <h6 className="font-heading-h6" style={{ color: "#667085" }}>Rating</h6>
                        </div>
                        <div className="movie-rating-badges">
                            <MovieRatingBadge rating={movie?.imdbRating} label="IMDB Rating" />
                            <MovieRatingBadge rating={movie?.rottenTomatoesRating} label="Rotten Tomatoes" />
                        </div>
                    </section>
                    <section>
                        <MovieCardSmallList />
                    </section>
                </>
            )}
        </div>
    )
}
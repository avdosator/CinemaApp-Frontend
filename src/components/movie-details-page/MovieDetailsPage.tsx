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
import { format } from "date-fns";
import UpcomingMovieInfo from "./upcoming-movie-info/UpcomingMovieInfo";
import LoadingIndicator from "../shared-components/loading-indicator/LoadingIndicator";

export default function MovieDetailsPage({ openLoginForm }: { openLoginForm: (path?: string, state?: any) => void }) {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    let [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            ApiService.get<Movie>(`/movies/${id}`)
                .then(response => {
                    setIsLoading(false);
                    setMovie(response);
                    window.scrollTo(0, 0);
                })
                .catch(error => console.error("Error fetching movie", error));
        }
    }, [id]);

    const isActive = (): boolean => {
        return movie!.projections.some(projection => new Date(projection.startDate) <= new Date());
    };

    return (
        isLoading ? (
            <LoadingIndicator />
        ) : (
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
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    loading="eager"
                                    style={{ borderRadius: "16px 0px 0px 16px", outline: "none" }}
                                >
                                </iframe>
                            </div>
                            <div className="movie-photos-container">
                                {movie.photos.length === 1 ?
                                    (<img src={movie.photos[0].url} className="only-movie-image" />) :
                                    movie?.photos.map(photo => (<img key={photo.id} src={photo.url} className="movie-details-image"></img>))
                                }
                            </div>
                        </section>
                        <section className="movie-info-ticket-container">
                            <div className="movie-info-container">
                                <h4 className="font-heading-h4" style={{ color: "#1D2939" }}>{movie?.title}</h4>
                                <div className="font-lg-regular basic-movie-info">
                                    <span>{movie?.pgRating}</span>
                                    <VerticalLine />
                                    <span>{movie?.language}</span>
                                    <VerticalLine width="0.5px" />
                                    <span>{`${movie?.durationInMinutes} Min`}</span>
                                    <VerticalLine />
                                    <span>
                                        {`Projection date: ${format(movie?.projections[0].startDate, "yyyy/MM/dd")} - ${format(movie?.projections[0].endDate, "yyyy/MM/dd")}`}
                                    </span>
                                </div>
                                <div className="movie-genres-container">
                                    {movie?.genres.map(genre => (<GenreBadge key={genre.id} label={genre.name} />))}
                                </div>
                                <p
                                    className="movie-synopsis font-lg-regular"
                                    style={{
                                        color: "#1D2939",
                                        marginBottom: movie?.synopsis.length < 300 ? "92px" : "0px"
                                    }}
                                >
                                    {movie?.synopsis}
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
                                {isActive() ? (<TicketForm movie={movie} />) : (<UpcomingMovieInfo title={movie.title} openLoginForm={openLoginForm} />)}
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
    )
}
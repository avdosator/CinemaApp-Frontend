import "./UpcomingMoviesList.css"
import { Movie } from "../../../types/Movie";
import MovieCard from "../../shared-components/card/movie-card/MovieCard";

export default function UpcomingMoviesList({movies}: {movies: Movie[]}) {
    return (
        <div className="upcoming-movies-list">
            {movies.map((movie, index) => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    )
}
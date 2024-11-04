import "./MovieCardBigList.css"
import MovieCardBig from "../movie-card-big/MovieCardBig";
import { Movie } from "../../../types/Movie";

export default function MovieCardBigList({ movies }: { movies: Movie[] }) {
    return (
        <div className="movie-card-big-list">
            {movies.map((item, index) => (
                <MovieCardBig key={index} movie={item} />
            ))}
        </div>
    )
}
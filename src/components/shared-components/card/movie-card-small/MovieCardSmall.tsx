import "./MovieCardSmall.css"
import { Link } from "react-router-dom";
import { Movie } from "../../../../types/Movie";

export default function MovieCardSmall({ movie }: { movie: Movie }) {
    const coverPhoto = movie.photos.find(photo => photo.id === movie.coverPhotoId);
    return (
        <Link to={`/movies/${movie.id}`} className="no-style-link">
            <div className="movie-card-small">
                <img src={coverPhoto?.url} alt="" className="movie-card-small-img" />
                <h5 className="font-lg-semibold" style={{ color: "#1D2939" }}>{movie.title}</h5>
            </div>
        </Link>
    )
}
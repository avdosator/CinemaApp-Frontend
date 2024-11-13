import "./MovieRatingBadge.css"
import { faStar as faStarRegular } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieRatingBadge({ rating, label }: { rating: number | undefined, label: string }) {
    return (
        <div className="movie-rating-badge">
            <div className="star-icon">
            <FontAwesomeIcon icon={faStarRegular} />
            </div>
            <div className="movie-rating-info">
                <div className="font-md-semibold" style={{ color: "#101828" }}>{rating ? rating : "Unknown"}</div>
                <div className="font-sm-regular" style={{ color: "#667085" }}>{label}</div>
            </div>
        </div>
    )
}
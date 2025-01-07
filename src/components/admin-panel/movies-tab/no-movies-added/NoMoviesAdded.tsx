import "./NoMoviesAdded.css"
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NoMoviesAdded() {
    return (
        <div className="no-movies-added-container">
            <div className="no-movies-added-icon-wrapper">
                <FontAwesomeIcon icon={faFilm} className="no-movies-added-icon" />
                <div className="no-movies-added-icon-diagonal"></div>
                <div className="no-movies-added-icon-diagonal"></div>
            </div>
            <h6 className="font-heading-h6">No movies added</h6>
            <p className="font-lg-regular" style={{ color: "#667085" }}>You can add movie via Add Movie button</p>
            <button className="add-movie-btn font-lg-semibold" id="addMovieBtn2">Add Movie</button>
        </div>
    )
}
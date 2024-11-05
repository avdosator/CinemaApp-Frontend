import "./NoMoviesPreview.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TertiaryButton from "../buttons/TertiaryButton";
import { faFilm } from "@fortawesome/free-solid-svg-icons"

export default function NoMoviesPreview() {
    return (
        <div className="no-movies-preview-container">
            <div className="no-movies-preview">
                <FontAwesomeIcon icon={faFilm} className="film-icon" />
                <p className="font-lg-semibold" style={{ color: "#1D2939", margin: "0", textAlign: "center" }}>No movies to preview for current date</p>
                <p className="font-lg-regular" style={{ color: "#475467", margin: "0" }}>
                    We are working on updating our schedule for upcoming movies.
                    Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!
                </p>
            </div>
            <TertiaryButton label={"Explore Upcoming Movies"} size={"large"} />
        </div>
    )
}
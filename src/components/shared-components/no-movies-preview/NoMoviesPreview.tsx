import "./NoMoviesPreview.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TertiaryButton from "../buttons/TertiaryButton";
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from "react-router-dom";

export default function NoMoviesPreview() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const handleButtonClick = () => {
        if (location.pathname === "/upcoming-movies") {
            // Remove query parameters and reload the page
            navigate("/upcoming-movies", { replace: true });
            window.location.reload();
        } else {
            // Navigate to the upcoming movies page if on any other page
            navigate("/upcoming-movies");
        }
    };

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
            <TertiaryButton label={"Explore Upcoming Movies"} size={"large"} onClick={handleButtonClick} />
        </div>
    )
}
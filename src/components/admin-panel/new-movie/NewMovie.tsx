import "./NewMovie.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewMovie() {
    return (
        <div className="add-movie-container">
            <div className="add-movie-heading">
                <h6 className="font-heading-h6">Add New Movie</h6>
                <button className="add-movie-cancel-btn">
                    <FontAwesomeIcon icon={faXmark} width={12} height={16} />
                </button>
            </div>
            

        </div>
    )
}
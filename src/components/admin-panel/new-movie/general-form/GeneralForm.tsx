import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GeneralForm() {
    return (
        <div>
            <form>
                <div className="left-part">
                    <div className="general-form-input-group">
                        <label htmlFor="name">Movie Name</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faFilm} className="input-icon" />
                            <input type="text"
                                name="name"
                                id="name"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type movie name"
                            />
                        </div>
                    </div>
                </div>
                <div className="right- part">

                </div>
            </form>
        </div>
    )
}
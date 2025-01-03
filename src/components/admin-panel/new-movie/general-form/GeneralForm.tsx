import "./GeneralForm.css"
import { faCalendarDays, faClock, faFilm, faLanguage, faLink, faR, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GeneralForm() {
    return (
        <form className="general-form">
            <div className="half-width-elements">
                <div className="left-part">
                    <div className="general-form-input-group">
                        <label htmlFor="name" className="font-lg-semibold">Movie Name</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faFilm} className="input-icon" />
                            <input type="text"
                                name="name"
                                id="name"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type movie name"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="language" className="font-lg-semibold">Language</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLanguage} className="input-icon" />
                            <input type="text"
                                name="language"
                                id="language"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type language"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="date" className="font-lg-semibold">Projection Date</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faCalendarDays} className="input-icon" />
                            <input type="text"
                                name="date"
                                id="date"
                                className="search-movies-input font-lg-regular"
                                placeholder="Choose projection date"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="director" className="font-lg-semibold">Director</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input type="text"
                                name="director"
                                id="director"
                                className="search-movies-input font-lg-regular"
                                placeholder="Add director"
                            />
                        </div>
                    </div>
                </div>
                <div className="right-part">
                    <div className="general-form-input-group">
                        <label htmlFor="pgRating" className="font-lg-semibold">PG Rating</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faR} className="input-icon" />
                            <input type="text"
                                name="pgRating"
                                id="pgRating"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type PG rating"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="duration" className="font-lg-semibold">Movie Duration</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faClock} className="input-icon" />
                            <input type="text"
                                name="duration"
                                id="duration"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type movie duration"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="genre" className="font-lg-semibold">Genre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faFilm} className="input-icon" />
                            <input type="text"
                                name="genre"
                                id="genre"
                                className="search-movies-input font-lg-regular"
                                placeholder="Choose genre"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="trailer" className="font-lg-semibold">Trailer link</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLink} className="input-icon" />
                            <input type="text"
                                name="trailer"
                                id="trailer"
                                className="search-movies-input font-lg-regular"
                                placeholder="Insert trailer link"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="general-form-input-group" style={{ marginTop: "24px" }}>
                <label htmlFor="synopsis" className="font-lg-semibold">Synopsis</label>
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLink} className="input-icon" style={{top: "24px"}} />
                    <textarea name="synopsis"
                        id="synopsis"
                        className="search-movies-input font-lg-regular"
                        placeholder="Write synopsis"
                        maxLength={500}
                    />
                </div>
            </div>
        </form>
    )
}
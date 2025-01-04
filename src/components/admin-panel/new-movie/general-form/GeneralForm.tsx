import "./GeneralForm.css"
import { faCalendarDays, faClock, faFilm, faLanguage, faLink, faR, faT, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import { useEffect, useState } from "react";
import ApiService from "../../../../service/ApiService";
import { Genre } from "../../../../types/Genre";
import { GeneralFormData } from "../../../../types/FormData";
import Select from "react-select";

export default function GeneralForm() {
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();

    let [formData, setFormData] = useState<GeneralFormData>();

    useEffect(() => {
        ApiService.get<Genre[]>("/genres")
            .then(genresResponse => {
                const genreOptions = genresResponse.map(genre => ({ value: genre.id, label: genre.name }))
                setGenreOptions(genreOptions);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])

    const handleChange = (
        name: keyof GeneralFormData,
        value: string | SelectOptionType[]
    ): void => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        } as GeneralFormData));
    };

    return (
        <form className="general-form">
            <div className="half-width-elements">
                <div className="left-part">
                    <div className="general-form-input-group">
                        <label htmlFor="name" className="font-lg-semibold">Movie Name</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faFilm} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
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
                            <FontAwesomeIcon icon={faLanguage} className={`input-icon ${formData?.language ? "red-icon" : ""}`} />
                            <input type="text"
                                name="language"
                                id="language"
                                className="search-movies-input font-lg-regular"
                                placeholder="Type language"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="projectionDate" className="font-lg-semibold">Projection Date</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faCalendarDays} className={`input-icon ${formData?.projectionDate ? "red-icon" : ""}`} />
                            <input type="text"
                                name="projectionDate"
                                id="projectionDate"
                                className="search-movies-input font-lg-regular"
                                placeholder="Choose projection date"
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="director" className="font-lg-semibold">Director</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} className={`input-icon ${formData?.director ? "red-icon" : ""}`} />
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
                            <FontAwesomeIcon icon={faR} className={`input-icon ${formData?.pgRating ? "red-icon" : ""}`} />
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
                            <FontAwesomeIcon icon={faClock} className={`input-icon ${formData?.duration ? "red-icon" : ""}`} />
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
                            <FontAwesomeIcon icon={faFilm} className={`input-icon ${formData?.genre ? "red-icon" : ""}`} />
                            <Select<SelectOptionType, true>
                                options={genreOptions}
                                placeholder="All Cities"
                                className="dropdown-menu-input"
                                classNamePrefix="dropdown"
                                isClearable={true}
                                value={formData?.genre ?? []}
                                onChange={(newValue) => handleChange("genre", [...newValue])}
                                name="genre"
                                isMulti
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="trailer" className="font-lg-semibold">Trailer link</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLink} className={`input-icon ${formData?.trailer ? "red-icon" : ""}`} id="trailerLinkIcon" />
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
                    <FontAwesomeIcon icon={faT} className={`input-icon ${formData?.synopsis ? "red-icon" : ""}`} style={{ top: "24px" }} />
                    <textarea name="synopsis"
                        id="synopsis"
                        className="search-movies-input font-lg-regular"
                        placeholder="Write synopsis"
                        rows={6}
                        maxLength={500}
                        style={{ paddingRight: "64px" }}
                    />
                    <div className="synopsis-length font-lg-regular">{0}/500</div>
                </div>
            </div>
        </form>
    )
}
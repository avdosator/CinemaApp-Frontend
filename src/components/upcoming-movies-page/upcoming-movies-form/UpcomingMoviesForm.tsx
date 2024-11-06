import { faBuilding, faLocationPin, faMagnifyingGlass, faVideo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select/base";

export default function UpcomingMoviesForm() {
    return (
        <form className="font-lg-regular upcoming-movies-form">
            <div className="input-wrapper">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="input-icon" />
                <input type="text"
                    className="search-movies-input font-lg-regular"
                    placeholder="Search Movies"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="dropdown-menu-inputs">
                <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLocationPin} className="input-icon" />
                    <Select<SelectOptionType, false>
                        options={cityOptions}
                        placeholder="All Cities"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.city}
                        onChange={(newValue) => handleChange("city", newValue)}
                        name="city"
                    />
                </div>
                <div className="input-wrapper">
                <FontAwesomeIcon icon={faBuilding} className="input-icon"  />
                    <Select<SelectOptionType, false>
                        options={venueOptions}
                        placeholder="All Cinemas"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.venue}
                        onChange={(newValue) => handleChange("venue", newValue)}
                        name="venue"
                    />
                </div>
                <div className="input-wrapper">
                <FontAwesomeIcon icon={faVideo} className="input-icon" /> 
                    <Select<SelectOptionType, false>
                        options={genreOptions}
                        placeholder="All Genres"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.genre}
                        onChange={(newValue) => handleChange("genre", newValue)}
                        name="genre"
                    />
                </div>
                {/* <div className="input-wrapper">
                    <FontAwesomeIcon icon={faClock} className="input-icon" />
                    <Select<SelectOptionType, false>
                        options={timeOptions}
                        placeholder="All Projection Times"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.time}
                        onChange={(newValue) => handleChange("time", newValue)}
                        name="time"
                    />
                </div> */}
            </div>
        </form>
    )
}
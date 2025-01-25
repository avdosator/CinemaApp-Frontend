import { faBuilding, faHashtag, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select/base";

export default function NewVenue() {
    return (
        <div className="new-venue-container">
            <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>New Venue</h6>
            <div className="full-width-horizontal-line"></div>
            <form className="new-venue-form">
                <div>
                    <input type="file" />
                    <div></div>
                </div>

                <div>
                    <div className="general-form-input-group">
                        <label htmlFor="venue" className="font-lg-semibold">Venue Name</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faBuilding} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="venue"
                                id="venue"
                                className="search-movies-input font-lg-regular"
                                placeholder="Venue"
                                autoFocus
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="phone" className="font-lg-semibold">Phone</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faPhone} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="phone"
                                id="phone"
                                className="search-movies-input font-lg-regular"
                                placeholder="Phone"
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
                            />
                        </div>
                    </div>

                </div>


                <div>
                    <div className="general-form-input-group">
                        <label htmlFor="street" className="font-lg-semibold">Street</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocation} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="street"
                                id="street"
                                className="search-movies-input font-lg-regular"
                                placeholder="Street"
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="streetNumber" className="font-lg-semibold">Street Number</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faHashtag} className={`input-icon ${formData?.title ? "red-icon" : ""}`} />
                            <input type="text"
                                name="streetNumber"
                                id="streetNumber"
                                className="search-movies-input font-lg-regular"
                                placeholder="Number"
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
                            />
                        </div>
                    </div>

                </div>


                <div className="general-form-input-group">
                        <label htmlFor="genre" className="font-lg-semibold">Genre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocation} className={`input-icon ${formData.genre.length > 0 ? "red-icon" : ""}`} />
                            <Select<SelectOptionType, false>
                                options={cityOptions}
                                placeholder="Choose city"
                                className="dropdown-menu-input"
                                classNamePrefix="dropdown"
                                isClearable={true}
                                value={formData.city}
                                onChange={(newValue) => handleChange("city", newValue)}
                                name="city"
                            />
                        </div>
                    </div>

            </form>
        </div>
    );
}

import "./CurrentlyShowingForm.css"
import DatePickerList from "../../shared-components/date-picker/date-picker-list/DatePickerList";
import Select, { SingleValue } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationPin, faClock } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { SelectOptionType } from "../../../types/SelectOptionType";

const cityOptions: SelectOptionType[] = [
    { value: "", label: "All Cities" },
    { value: "Sarajevo", label: "Sarajevo" },
    { value: "Sarajevo", label: "Mostar" }
];

const venueOptions: SelectOptionType[] = [
    { value: "", label: "All Cinemas" },
    { value: "Cineplex", label: "Cineplex" },
    { value: "Cinema City", label: "Cinema City" },
    { value: "Cinestar", label: "Cinestar" }
];

const genreOptions: SelectOptionType[] = [
    { value: "", label: "All Genres" },
    { value: "Drama", label: "Drama" },
    { value: "War", label: "War" }
];

const timeOptions: SelectOptionType[] = [
    { value: "", label: "All Projection Times" },
    { value: "12:00", label: "12:00" },
    { value: "14:00", label: "14:00" }
];

type FormData = {
    title: string,
    city: SelectOptionType | null,
    venue: SelectOptionType | null,
    genre: SelectOptionType | null,
    time: SelectOptionType | null,
    date: string
}

export default function CurrentlyShowingForm() {
    let [formData, setFormData] = useState<FormData>({ title: "", city: null, venue: null, genre: null, time: null, date: "" });

    const handleChange = (name: string, value: string | SingleValue<SelectOptionType>) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleDateChange = (date: string) => {
        setFormData((prevData) => ({
            ...prevData,
            date: date
        }));
    }
    console.log(formData);

    return (
        <div className="form-container">
            <div className="currently-showing-form">
                <form className="font-lg-regular">
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
                            <FontAwesomeIcon icon={faLocationPin} className="input-icon" />
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
                            <FontAwesomeIcon icon={faLocationPin} className="input-icon" />
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
                        <div className="input-wrapper">
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
                        </div>
                    </div>
                </form>
            </div>
            <div className="date-picker-container">
                <DatePickerList pickDate={handleDateChange} />
            </div>
        </div>
    )
}
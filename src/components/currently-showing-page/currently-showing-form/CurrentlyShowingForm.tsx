import "./CurrentlyShowingForm.css"
import DatePickerList from "../../shared-components/date-picker/date-picker-list/DatePickerList";
import Select, { SingleValue } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationPin, faClock } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../types/SelectOptionType";
import ApiService from "../../../service/ApiService";
import { PageResponse } from "../../../types/PageResponse";
import { City } from "../../../types/City";
import { Genre } from "../../../types/Genre";
import { Venue } from "../../../types/Venue";

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
    let [cityOptions, setCityOptions] = useState<SelectOptionType[]>();
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();
    let [venueOptions, setVenueOptions] = useState<SelectOptionType[]>();

    useEffect(() => {
        Promise.all([
            ApiService.get<City[]>("/cities"),
            ApiService.get<PageResponse<Venue>>("/venues"),
            ApiService.get<Genre[]>("/genres")
        ])
        .then(([citiesResponse, venuesResponse, genresResponse]) => {
            const cities = citiesResponse || [];
            setCityOptions(cities.map(city => ({ value: city.name, label: city.name })));
    
            const venues = venuesResponse.content || [];
            setVenueOptions(venues.map(venue => ({ value: venue.name, label: venue.name })));
    
            const genres = genresResponse || [];
            setGenreOptions(genres.map(genre => ({ value: genre.name, label: genre.name })));
        })
        .catch(error => console.error("Error fetching data:", error));
    }, []);

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
                <DatePickerList pickDate={handleDateChange} selectedDate={formData.date} />
            </div>
        </div>
    )
}
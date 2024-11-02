import "./CurrentlyShowingForm.css"
import DatePickerList from "../../shared-components/date-picker/date-picker-list/DatePickerList";
import Select, {  SingleValue, ActionMeta } from "react-select";
import { useState } from "react";

type OptionType = {
    value: string;
    label: string;
};

const cityOptions: OptionType[] = [
    { value: "", label: "All Cities" },
    { value: "Sarajevo", label: "Sarajevo" },
    { value: "Sarajevo", label: "Mostar" }
];

const venueOptions: OptionType[] = [
    { value: "", label: "All Cinemas" },
    { value: "Cineplex", label: "Cineplex" },
    { value: "Cinema City", label: "Cinema City" },
    { value: "Cinestar", label: "Cinestar" }
];

const genreOptions: OptionType[] = [
    { value: "", label: "All Genres" },
    { value: "Drama", label: "Drama" },
    { value: "War", label: "War" }
];

const timeOptions: OptionType[] = [
    { value: "", label: "All Projections" },
    { value: "12:00", label: "12:00" },
    { value: "14:00", label: "14:00" }
];



export default function CurrentlyShowingForm() {
    
    const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
    const [selectedVenue, setSelectedVenue] = useState<OptionType | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(null);
    const [selectedTime, setSelectedTime] = useState<OptionType | null>(null);


    const handleCityChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedCity(newValue);
    };

    const handleVenueChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedVenue(newValue);
    };

    const handleGenreChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedGenre(newValue);
    };

    const handleTimeChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedTime(newValue);
    };

    return (
        <div className="form-container">
            <div className="currently-showing-form">
                <form className="font-lg-regular">
                    <div className="search-movies">
                        <input type="text" className="search-movies-input font-lg-regular form-element" placeholder="Search Movies" />
                    </div>
                    <div className="dropdown-menu-inputs">
                        <Select<OptionType, false>
                            options={cityOptions}
                            placeholder="All Cities"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={selectedCity}
                            onChange={handleCityChange}
                        />
                        <Select<OptionType, false>
                            options={venueOptions}
                            placeholder="All Cinemas"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={selectedVenue}
                            onChange={handleVenueChange}
                        />
                        <Select<OptionType, false>
                            options={genreOptions}
                            placeholder="All Genres"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={selectedGenre}
                            onChange={handleGenreChange}
                        />
                        <Select<OptionType, false>
                            options={timeOptions}
                            placeholder="All Projections"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={selectedTime}
                            onChange={handleTimeChange}
                        />
                    </div>
                </form>
            </div>
            <div className="date-picker-container">
                <DatePickerList />
            </div>
        </div>
    )
}
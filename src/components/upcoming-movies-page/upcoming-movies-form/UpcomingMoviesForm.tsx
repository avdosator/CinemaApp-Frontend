import "./UpcomingMoviesForm.css"
import { faBuilding, faCalendar, faLocationPin, faMagnifyingGlass, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { SingleValue } from "react-select";
import { SelectOptionType } from "../../../types/SelectOptionType";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format } from 'date-fns';
import { useState } from "react";
import { UpcomingMoviesFormData } from "../../../types/CurrentlyShowingFormData";

type UpcomingMoviesFormProps = {
    handleChange: (name: string, value: string | SingleValue<SelectOptionType>) => void,
    // handleDateChange: (startDate: string, endDate: string) => void,
    formData: UpcomingMoviesFormData,
    cityOptions?: SelectOptionType[]; // Marked as optional with '?'
    genreOptions?: SelectOptionType[];
    venueOptions?: SelectOptionType[];
}

type IconName = "magnifyingGlass" | "locationPin" | "building" | "video" | "clock" | "calendar" | null;

export default function UpcomingMoviesForm({
    handleChange,
    formData,
    cityOptions,
    genreOptions,
    venueOptions }: UpcomingMoviesFormProps) {
    const [calendarState, setCalendarState] = useState<Range[]>([{ startDate: new Date(), endDate: new Date(), key: 'selection', }]);
    const [open, setOpen] = useState(false);
    const [focusedIcon, setFocusedIcon] = useState<IconName>(null);
    const [formattedDateRange, setFormattedDateRange] = useState('');

    const handleApply = () => {
        const { startDate, endDate } = calendarState[0];
        if (startDate && endDate) {
            // const formattedStart = format(startDate, 'yyyy/MM/dd');
            // const formattedEnd = format(endDate, 'yyyy/MM/dd');
            const formattedRangeDisplay = `${format(startDate, 'yyyy/MM/dd')} - ${format(endDate, 'yyyy/MM/dd')}`;

            // ISO format for backend, combined into a single string
            const formattedRangeISO = `${format(startDate, 'yyyy-MM-dd')}/${format(endDate, 'yyyy-MM-dd')}`;
            setFormattedDateRange(formattedRangeDisplay);
            handleChange("dateRange", formattedRangeISO);
        }
        setOpen(false); // Close the date picker
    };

    const handleSelectValueChange = (newValue: SingleValue<SelectOptionType>): void => {
        if (newValue === null) { // Check if cleared
            handleChange("dateRange", ""); // Clear date range in parent formData
            setFormattedDateRange(""); // Clear local date range display for placeholder
        }
    }


    const handleFocus = (iconName: IconName) => {
        setFocusedIcon(iconName);
    };

    const handleBlur = () => {
        setFocusedIcon(null);
    };

    return (
        <form className="font-lg-regular upcoming-movies-form">
            <div className="input-wrapper" onFocus={() => handleFocus("magnifyingGlass")} onBlur={handleBlur}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={`input-icon ${focusedIcon === "magnifyingGlass" ? "focused-icon" : ""}`} />
                <input type="text"
                    className="search-movies-input font-lg-regular"
                    placeholder="Search Movies"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="dropdown-menu-inputs">
                <div className="input-wrapper" onFocus={() => handleFocus("locationPin")} onBlur={handleBlur}>
                    <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${focusedIcon === "locationPin" ? "focused-icon" : ""}`} />
                    <Select<SelectOptionType, false>
                        options={cityOptions}
                        placeholder="All Cities"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.city}
                        onChange={(newValue) => handleChange("city", newValue)}
                    />
                </div>
                <div className="input-wrapper" onFocus={() => handleFocus("building")} onBlur={handleBlur}>
                    <FontAwesomeIcon icon={faBuilding} className={`input-icon ${focusedIcon === "building" ? "focused-icon" : ""}`} />
                    <Select<SelectOptionType, false>
                        options={venueOptions}
                        placeholder="All Cinemas"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.venue}
                        onChange={(newValue) => handleChange("venue", newValue)}
                    />
                </div>
                <div className="input-wrapper" onFocus={() => handleFocus("video")} onBlur={handleBlur}>
                    <FontAwesomeIcon icon={faVideo} className={`input-icon ${focusedIcon === "video" ? "focused-icon" : ""}`} />
                    <Select<SelectOptionType, false>
                        options={genreOptions}
                        placeholder="All Genres"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.genre}
                        onChange={(newValue) => handleChange("genre", newValue)}
                    />
                </div>
                <div className="input-wrapper" onFocus={() => handleFocus("calendar")} onBlur={handleBlur}>
                    <FontAwesomeIcon icon={faCalendar} className={`input-icon ${focusedIcon === "calendar" ? "focused-icon" : ""}`} />
                    <Select<SelectOptionType, false>
                        options={[]}
                        placeholder="Date Range"
                        className="dropdown-menu-input"
                        classNamePrefix="dropdown"
                        isClearable={true}
                        value={formData.dateRange ? { value: "dateRange", label: formattedDateRange } : null}
                        onChange={(newValue) => handleSelectValueChange(newValue)}
                        menuIsOpen={false} // Controls whether the dropdown shows
                        onMenuOpen={() => setOpen(true)}
                    />
                    {open && (
                        <div className="date-picker">
                            <DateRange
                                editableDateInputs={false}
                                onChange={(item: RangeKeyDict) => setCalendarState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={calendarState}
                                className="custom-date-range font-lg-regular"
                                showMonthAndYearPickers={false}
                                rangeColors={["#FDE3E3"]}
                                dateDisplayFormat="yyyy/MM/dd"
                            />
                            <div className="date-range-buttons">
                                <button className="date-picker-cancel font-sm-semibold" onClick={() => setOpen(false)} >Cancel</button>
                                <button className="date-picker-apply font-sm-semibold" onClick={handleApply} >Apply</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </form>
    )
}
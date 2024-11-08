import "./UpcomingMoviesForm.css"
import { faBuilding, faCalendar, faLocationPin, faMagnifyingGlass, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { SingleValue } from "react-select";
import { SelectOptionType } from "../../../types/SelectOptionType";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { useState } from "react";
import { UpcomingMoviesFormData } from "../../../types/CurrentlyShowingFormData";
import { enGB } from "date-fns/locale";

type UpcomingMoviesFormProps = {
    handleChange: (name: string, value: string | SingleValue<SelectOptionType>) => void,
    handleDateChange: (startDate: string, endDate: string) => void,
    formData: UpcomingMoviesFormData,
    cityOptions?: SelectOptionType[]; // Marked as optional with '?'
    genreOptions?: SelectOptionType[];
    venueOptions?: SelectOptionType[];
}

type IconName = "magnifyingGlass" | "locationPin" | "building" | "video" | "clock" | "calendar" | null;

export default function UpcomingMoviesForm({
    handleChange,
    handleDateChange,
    formData,
    cityOptions,
    genreOptions,
    venueOptions }: UpcomingMoviesFormProps) {
    const [calendarState, setCalendarState] = useState<Range[]>([{ startDate: new Date(), endDate: new Date(), key: 'selection', }]);
    const [open, setOpen] = useState(false);

    const [focusedIcon, setFocusedIcon] = useState<IconName>(null);

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
                        name="city"
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
                        name="venue"
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
                        name="genre"
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
                        value={formData.genre}
                        onChange={(newValue) => handleChange("genre", newValue)}
                        name="date"
                        onMenuOpen={() => setOpen(!open)}
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
                                // color="#FDE3E3"
                                locale={enGB}
                                rangeColors={["#FDE3E3"]}
                                dateDisplayFormat="yyyy-mm-dd"
                            />
                            <div className="date-range-buttons">
                                <button className="cancel-button" >Cancel</button>
                                <button className="apply-button" >Apply</button>
                            </div>
                        </div>
                    )}

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
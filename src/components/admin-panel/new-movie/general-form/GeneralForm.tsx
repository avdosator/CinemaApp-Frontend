import "../../../upcoming-movies-page/upcoming-movies-form/UpcomingMoviesForm.css"
import "./GeneralForm.css"
import { faCalendarDays, faClock, faFilm, faLanguage, faLink, faR, faT, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectOptionType } from "../../../../types/SelectOptionType";
import { GeneralFormData } from "../../../../types/FormData";
import Select, { SingleValue } from "react-select";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import ApiService from "../../../../service/ApiService";
import { Genre } from "../../../../types/Genre";

type GeneralFormProps = {
    formData: GeneralFormData;
    setFormData: React.Dispatch<React.SetStateAction<GeneralFormData>>;
    calendarState: Range[];
    setCalendarState: React.Dispatch<React.SetStateAction<Range[]>>;
    isDatePickerOpened: boolean;
    setIsDatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
    formattedDateRange: string;
    setFormattedDateRange: React.Dispatch<React.SetStateAction<string>>;
};

export default function GeneralForm({
    formData,
    setFormData,
    calendarState,
    setCalendarState,
    isDatePickerOpened,
    setIsDatePickerOpened,
    formattedDateRange,
    setFormattedDateRange
}: GeneralFormProps) {
    let [genreOptions, setGenreOptions] = useState<SelectOptionType[]>();

    useEffect(() => {
        ApiService.get<Genre[]>("/genres")
            .then(genresResponse => {
                const genreOptions = genresResponse.map(genre => ({ value: genre.id, label: genre.name }))
                setGenreOptions(genreOptions);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])


    const handleChange = (name: keyof GeneralFormData, value: string | SelectOptionType[]) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleApply = () => {
        const { startDate, endDate } = calendarState[0];
        if (!startDate || !endDate) {
            alert("Please select both a start and end date.");
            return;
        }

        const formattedRangeDisplay = `${format(startDate, 'yyyy/MM/dd')} - ${format(endDate, 'yyyy/MM/dd')}`;
        setFormattedDateRange(formattedRangeDisplay);

        const isoStartDate = format(startDate, 'yyyy-MM-dd');
        const isoEndDate = format(endDate, 'yyyy-MM-dd');

        handleChange("startDate", isoStartDate);
        handleChange("endDate", isoEndDate);

        setIsDatePickerOpened(false);
    };

    const handleSelectValueChange = (newValue: SingleValue<SelectOptionType>): void => {
        if (newValue === null) {
            handleChange("startDate", "");
            handleChange("endDate", "");
            setFormattedDateRange("");
        }
    }

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
                                value={formData.title}
                                onChange={e => handleChange("title", e.target.value)}
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
                                value={formData.language}
                                onChange={e => handleChange("language", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="projectionDate" className="font-lg-semibold">Projection Date</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faCalendarDays} className={`input-icon ${formData?.startDate ? "red-icon" : ""}`} />
                            <Select<SelectOptionType, false>
                                options={[]}
                                placeholder="Choose projection date"
                                className="dropdown-menu-input"
                                classNamePrefix="dropdown"
                                isClearable={true}
                                value={formattedDateRange ? { value: "dateRange", label: formattedDateRange } : null}
                                onChange={(newValue) => handleSelectValueChange(newValue)}
                                menuIsOpen={isDatePickerOpened}
                                onMenuOpen={() => setIsDatePickerOpened(true)}
                            />
                            {isDatePickerOpened && (
                                <div className="date-picker" id="generalFormDatePicker">
                                    <DateRange
                                        editableDateInputs={false}
                                        onChange={(item: RangeKeyDict) => setCalendarState([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        showMonthAndYearPickers={false}
                                        ranges={calendarState}
                                        className="custom-date-range font-lg-regular"
                                        rangeColors={["#FDE3E3"]}
                                        dateDisplayFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                    />
                                    <div className="date-range-buttons">
                                        <button className="date-picker-cancel font-sm-semibold" onClick={() => setIsDatePickerOpened(false)}>Cancel</button>
                                        <button className="date-picker-apply font-sm-semibold" onClick={handleApply}>Apply</button>
                                    </div>
                                </div>
                            )}
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
                                value={formData.director}
                                onChange={e => handleChange("director", e.target.value)}
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
                                value={formData.pgRating}
                                onChange={e => handleChange("pgRating", e.target.value)}
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
                                value={formData.duration}
                                onChange={e => handleChange("duration", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="general-form-input-group">
                        <label htmlFor="genre" className="font-lg-semibold">Genre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faFilm} className={`input-icon ${formData.genre.length > 0 ? "red-icon" : ""}`} />
                            <Select<SelectOptionType, true>
                                options={genreOptions}
                                placeholder="Choose genre"
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
                                value={formData.trailer}
                                onChange={e => handleChange("trailer", e.target.value)}
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
                        style={{ paddingRight: "84px" }}
                        value={formData.synopsis}
                        onChange={e => handleChange("synopsis", e.target.value)}
                    />
                    <div className="synopsis-length font-lg-regular">{formData.synopsis.length}/500</div>
                </div>
            </div>
        </form>
    )
}
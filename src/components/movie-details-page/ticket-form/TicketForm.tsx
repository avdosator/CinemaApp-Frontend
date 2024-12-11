import "./TicketForm.css"
import TimeBadge from "../../shared-components/time-badge/TimeBadge";
import { Movie } from "../../../types/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Select, { SingleValue } from "react-select";
import { SelectOptionType } from "../../../types/SelectOptionType";
import DatePickerBtnSmall from "../../shared-components/date-picker/date-picker-btn-small/DatePickerBtnSmall";
import { useState } from "react";
import { MovieDetailsFormData } from "../../../types/FormData";
import { IconType } from "../../../types/IconType";
import { generateDatePickerBtnInputs } from "../../../utils/utils";
import { DatePickerBtnType } from "../../../types/DatePickerBtn";

export default function TicketForm({ movie }: { movie: Movie }) {
    const [formData, setFormData] = useState<MovieDetailsFormData>({ city: null, venue: null, date: new Date().toISOString().split('T')[0], time: "" });
    const [focusedIcon, setFocusedIcon] = useState<IconType>(null);

    const dates: DatePickerBtnType[] = generateDatePickerBtnInputs(new Date(movie.projections[0].endDate));

    const venueOptions: SelectOptionType[] = Array.from(
        new Map(
            movie.projections.map(projection => {
                const venue = projection.hall.venue;
                return [venue.id, { value: venue.id, label: venue.name }];
            })
        ).values()
    );

    const cityOptions: SelectOptionType[] = Array.from(
        new Map(
            movie.projections.map(projection => {
                const city = projection.hall.venue.city;
                return [city.id, { value: city.id, label: city.name }];
            })
        ).values()
    );

    const handleChange = (name: string, value: string | SingleValue<SelectOptionType>): void => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();   
    }

    const sendRequest = ():void => {
        if (!isFormComplete) return;

        // Replace this with the actual request logic
        console.log("Sending request with data:", formData);
    }

    const handleFocus = (iconName: IconType): void => {
        setFocusedIcon(iconName);
    };

    const handleBlur = (): void => {
        setFocusedIcon(null);
    };

    const isFormComplete = formData.city && formData.venue && formData.date && formData.time;

    return (
        <form className="ticket-form-container" onSubmit={handleSubmit}>
            <div>
                <div className="dropdown-menu-inputs ticket-inputs">
                    <div className="input-wrapper" onFocus={() => handleFocus("locationPin")} onBlur={handleBlur}>
                        <FontAwesomeIcon icon={faLocationPin} className={`input-icon ${focusedIcon === "locationPin" ? "focused-icon" : ""}`} />
                        <Select<SelectOptionType, false>
                            options={cityOptions}
                            placeholder="Choose city"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.city}
                            onChange={(newvalue) => handleChange("city", newvalue)}
                            name="city"
                        />
                    </div>
                    <div className="input-wrapper" onFocus={() => handleFocus("building")} onBlur={handleBlur}>
                        <FontAwesomeIcon icon={faBuilding} className={`input-icon ${focusedIcon === "building" ? "focused-icon" : ""}`} />
                        <Select<SelectOptionType, false>
                            options={venueOptions}
                            placeholder="Choose Cinema"
                            className="dropdown-menu-input"
                            classNamePrefix="dropdown"
                            isClearable={true}
                            value={formData.venue}
                            onChange={(newvalue) => handleChange("venue", newvalue)}
                            name="venue"
                        />
                    </div>
                </div>
                <div className="date-picker-btn-container">
                    {dates.map((date, index) => (
                        (<DatePickerBtnSmall
                            key={index}
                            date={date.displayDate}
                            day={date.dayLabel}
                            pickDate={() => handleChange("date", date.isoDate)}
                            selected={formData.date === date.isoDate} />)
                    ))}
                </div>
            </div>
            <div className="movie-projecton-times">
                <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>Standard</h6>
                <div className="projection-times">
                    {movie.projections.map(projection => {
                        return projection.startTime.map((time, index) => (
                            (<TimeBadge key={index}
                                label={time}
                                isSelected={formData.time === time}
                                onClick={() => handleChange("time", time)} />)
                        ))
                    })}
                </div>
            </div>
            <div className="ticket-btns-container">
                <div className="horizontal-line"></div>
                <div className="ticket-btns font-lg-semibold">
                    <button
                        className={isFormComplete ? "ticket-btn-reserve" : "ticket-btn-reserve-disabled"}
                        disabled={!isFormComplete}
                    >
                        Reserve Ticket
                    </button>
                    <button
                        className={isFormComplete ? "ticket-btn-buy" : "ticket-btn-buy-disabled"}
                        disabled={!isFormComplete}
                        type="submit"
                        onClick={sendRequest}
                    >
                        Buy Ticket
                    </button>
                </div>
            </div>
        </form>
    )
}
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

type DatePickerBtnSmall = {
    isoDate: string,
    displayDate: string,
    dayLabel: string
}

const generateDates = (endDate: Date): DatePickerBtnSmall[] => {
    const today = new Date();

    // Generate array of objects from today to endDate
    const dates = [];
    let currentDate = new Date(today);

    while (currentDate <= endDate) {
        dates.push({
            isoDate: currentDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
            displayDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            dayLabel: dates.length === 0 ? "Today" : currentDate.toDateString().substring(0, 4),
        });

        // Increment currentDate by 1 day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export default function TicketForm({ movie }: { movie: Movie }) {
    let [formData, setFormData] = useState<MovieDetailsFormData>({ city: null, venue: null, date: "", time: "" });
    
    const dates = generateDates(new Date(movie.projections[0].endDate));

    const cityOptions: SelectOptionType[] = [{ value: "cityId", label: "Mostar" }];
    const venueOptions: SelectOptionType[] = [{value: "venuId", label: "Cinema City Mostar"}];

    const handleChange = (name: string, value: string | SingleValue<SelectOptionType>): void => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    return (
        <form className="ticket-form-container" onSubmit={handleSubmit}>
            <div>
                <div className="dropdown-menu-inputs ticket-inputs">
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLocationPin} className="input-icon" />
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
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faBuilding} className="input-icon" />
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
                        (<DatePickerBtnSmall key={index} date={date.displayDate} day={date.dayLabel} selected={false} />)
                    ))}
                </div>
            </div>
            <div className="movie-projecton-times">
                <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>Standard</h6>
                <div className="projection-times">
                    {movie.projections.map(projection => {
                        return projection.startTime.map((time, index) => (
                            (<TimeBadge key={index} label={time} isSelected={false} onClick={() => { }} />)
                        ))
                    })}
                </div>
            </div>
            <div className="ticket-btns-container">
                <div className="horizontal-line"></div>
                <div className="ticket-btns font-lg-semibold">
                    <button className="ticket-btn-reserve">Reserve Ticket</button>
                    <button className="ticket-btn-buy">Buy Ticket</button>
                </div>
            </div>
        </form>
    )
}
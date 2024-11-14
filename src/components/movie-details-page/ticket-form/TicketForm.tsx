import "./TicketForm.css"
import TimeBadge from "../../shared-components/time-badge/TimeBadge";
import { Movie } from "../../../types/Movie";

export default function TicketForm({ movie }: { movie: Movie }) {
    return (
        <form className="ticket-form-container">
            <div>
                <div className="movie-select-container">
                    <select name="" id=""></select>
                    <select name="" id=""></select>
                </div>
                <div className="date-picker-btn-container">

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
                {/* <TimeBadge label="16:00" isSelected={false} onClick={() => { }} />
                <TimeBadge label="18:00" isSelected={false} onClick={() => { }} /> */}
            </div>
            <div className="horizontal-line"></div>
            <div className="ticket-btns font-lg-semibold">
                <button className="ticket-btn-reserve">Reserve Ticket</button>
                <button className="ticket-btn-buy">Buy Ticket</button>
            </div>
        </form>
    )
}
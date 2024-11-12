import TimeBadge from "../../shared-components/time-badge/TimeBadge";

export default function TicketForm() {
    return (
        <div className="ticket-form-container">
            <div className="movie-select-container">

            </div>
            <div className="date-picker-btn-container">

            </div>
            <div className="movie-projecton-times">
                <h6 className="font-heading-h6" style={{ color: "#1D2939" }}>Standard</h6>
                <TimeBadge label="16:00" isSelected={false} onClick={() => { }} />
                <TimeBadge label="18:00" isSelected={false} onClick={() => { }} />
            </div>
            <div className="ticket-btns font-lg-semibold">
                <button className="ticket-btn-reserve">Reserve Ticket</button>
                <button className="ticket-btn-buy">Buy Ticket</button>
            </div>
        </div>
    )
}
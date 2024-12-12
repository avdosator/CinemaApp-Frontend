import "./LoveSeat.css"
import "./Seat.css"

type LoveSeatProps = {
    number: string,
}

export default function LoveSeat({number}: LoveSeatProps) {
    return (
        <button className="seat love-seat">
            {number}
        </button>
    )
}
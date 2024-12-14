import "./LoveSeat.css"
import "./Seat.css"

type LoveSeatProps = {
    number: string,
    classes?: string
}

export default function LoveSeat({number, classes}: LoveSeatProps) {
    return (
        <button className={`seat love-seat ${classes}`}>
            {number}
        </button>
    )
}
import "./Seat.css"

type SeatProps = {
    number: string,
    type: string
}

export default function RegularSeat({ number, type }: SeatProps) {
    const seatType: string = type;
    return (
        <button className="seat">
            {number}
        </button>
    )
}

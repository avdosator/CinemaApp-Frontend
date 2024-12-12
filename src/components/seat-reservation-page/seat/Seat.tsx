import "./Seat.css"

type SeatProps = {
    number: string,
    type: string
}

export default function Seat({ number, type }: SeatProps) {
    const seatType: string = type;
    return (
        <button className="seat">
            {number}
        </button>
    )
}

import "./RegularSeat.css"

type RegularSeatProps = {
    number: string,
}

export default function RegularSeat({ number }: RegularSeatProps) {
    return (
        <button className="seat regular-seat">
            {number}
        </button>
    )
}

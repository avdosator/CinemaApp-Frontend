import "./LoveSeat.css"

type LoveSeatProps = {
    number: string,
}

export default function LoveSeat({number}: LoveSeatProps) {
    return (
        <button className="love-seat">
            {number}
        </button>
    )
}
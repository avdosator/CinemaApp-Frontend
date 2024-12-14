import "./RegularSeat.css"

type RegularSeatProps = {
    number: string,
    classes?: string
}

export default function RegularSeat({ number, classes }: RegularSeatProps) {
    return (
        <button className={`seat regular-seat ${classes}`}>
            {number}
        </button>
    )
}

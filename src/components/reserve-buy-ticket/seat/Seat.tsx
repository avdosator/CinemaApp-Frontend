type SeatProps = {
    number: string,
    type: "regular" | "vip" | "love"
}

export default function Seat({ number }: SeatProps) {
    return (
        <button className="seat">
            {number}
        </button>
    )
}

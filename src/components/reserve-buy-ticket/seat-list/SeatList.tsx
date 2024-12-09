export default function SeatList() {
    return (
        <div className="seat-list">
            {Array.from({ length: 64 }, (_, i) => (
                <div key={i} className="seat">
                    Seat {i + 1}
                </div>
            ))}
        </div>
    )
}
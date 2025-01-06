import { useState } from "react"
import "./SeatList.css"
import { Seat } from "../../../../types/Seat"
import RegularSeat from "../seat/RegularSeat"
import VipSeat from "../seat/VipSeat"
import LoveSeat from "../seat/LoveSeat"
import { ProjectionInstance } from "../../../../types/ProjectionInstance"

type SeatListProps = {
    projectionInstance: ProjectionInstance,
    selectedSeats: Seat[]; // Array of selected seat IDs
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>; // Setter function for selectedSeats
}

export default function SeatList({ projectionInstance, selectedSeats, setSelectedSeats }: SeatListProps) {
    const [seats] = useState<Seat[]>(projectionInstance.projection.hall.seats);
    const { seatReservations } = projectionInstance;

    const getSeatStatus = (seatId: string) => {
        if (!seatReservations || seatReservations.length === 0) {
            return ""; // No reservations, all seats available
        }
        const isReserved = seatReservations.some(reservation => reservation.seat.id === seatId);
        return isReserved ? "reserved-seat" : ""; // Add "reserved-seat" class if reserved
    };

    const toggleSeatSelection = (seat: Seat) => {
        if (!seatReservations.some(reservation => reservation.seat.id === seat.id)) {
            setSelectedSeats(prevSelected => {
                const isAlreadySelected = prevSelected.some(selectedSeat => selectedSeat.id === seat.id);
                if (isAlreadySelected) {
                    return prevSelected.filter(selectedSeat => selectedSeat.id !== seat.id); // Deselect seat
                } else {
                    return [...prevSelected, seat]; // Select seat
                }
            });
        }
    };

    const filterSeatsBySide = (seats: Seat[], side: "left" | "right") => {
        return seats.filter(seat => {
            const row = seat.number[0];
            const seatNumber = parseInt(seat.number.slice(1));

            const rowSeats = seats.filter(s => s.number[0] === row);
            const half = Math.ceil(rowSeats.length / 2);

            return side === "left" ? seatNumber <= half : seatNumber > half;
        });
    };

    const renderSeat = (seat: Seat) => {
        const isSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id);
        const seatClass = `${getSeatStatus(seat.id)} ${isSelected ? "selected-seat" : ""}`;
        return (
            <div onClick={() => toggleSeatSelection(seat)} key={seat.id}>
                {(() => {
                    switch (seat.type) {
                        case "regular":
                            return <RegularSeat number={seat.number} classes={seatClass} />;
                        case "VIP":
                            return <VipSeat number={seat.number} classes={seatClass} />;
                        case "love":
                            return <LoveSeat number={seat.number} classes={seatClass} />;
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };


    return (
        <div className="seat-list-container">
            <div className="left-seats">
                {filterSeatsBySide(seats, "left").map(seat => renderSeat(seat))}
            </div>
            <div className="passage"></div>
            <div className="right-seats">
                {filterSeatsBySide(seats, "right").map(seat => renderSeat(seat))}
            </div>
        </div>
    )
}
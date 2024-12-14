import { useState } from "react"
import "./SeatList.css"
import { Seat } from "../../../types/Seat"
import RegularSeat from "../seat/RegularSeat"
import VipSeat from "../seat/VipSeat"
import LoveSeat from "../seat/LoveSeat"
import { ProjectionInstance } from "../../../types/ProjectionInstance"

type SeatListProps = {
    projectionInstance: ProjectionInstance,
    selectedSeats: string[]; // Array of selected seat IDs
    setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>; // Setter function for selectedSeats
}

export default function SeatList({ projectionInstance, selectedSeats, setSelectedSeats }: SeatListProps) {
    const [seats, setSeats] = useState<Seat[]>(projectionInstance.projection.hall.seats);
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
                const isAlreadySelected = prevSelected.includes(seat.id);
                if (isAlreadySelected) {
                    return prevSelected.filter(id => id !== seat.id); // Deselect seat
                } else {
                    return [...prevSelected, seat.id]; // Select seat
                }
            });
        }
    };

    const renderSeat = (seat: Seat) => {
        const isSelected = selectedSeats.includes(seat.id);
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
                {seats
                    .filter(seat => {
                        const row = seat.number[0]; // Extract the row letter (e.g., 'A' from 'A1')
                        const seatNumber = parseInt(seat.number.slice(1)); // Extract the number (e.g., 1 from 'A1')

                        // Find all seats in the current row
                        const rowSeats = seats.filter(s => s.number[0] === row);
                        const half = Math.ceil(rowSeats.length / 2); // Split the row into halves

                        return seatNumber <= half; // Seats in the first half go to the left
                    })
                    .map(seat => renderSeat(seat))}
            </div>
            <div className="passage"></div>
            <div className="right-seats">
                {seats
                    .filter(seat => {
                        const row = seat.number[0];
                        const seatNumber = parseInt(seat.number.slice(1));

                        const rowSeats = seats.filter(s => s.number[0] === row);
                        const half = Math.ceil(rowSeats.length / 2);
                        return seatNumber > half;
                    })
                    .map(seat => renderSeat(seat))}
            </div>
        </div>
    )
}
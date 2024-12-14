import { useState } from "react"
import "./SeatList.css"
import { Seat } from "../../../types/Seat"
import RegularSeat from "../seat/RegularSeat"
import VipSeat from "../seat/VipSeat"
import LoveSeat from "../seat/LoveSeat"
import { ProjectionInstance } from "../../../types/ProjectionInstance"

type SeatListProps = {
    projectionInstance: ProjectionInstance
}

export default function SeatList({ projectionInstance }: SeatListProps) {
    const [seats, setSeats] = useState<Seat[]>(projectionInstance.projection.hall.seats);
    const { seatReservations } = projectionInstance;
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const getSeatStatus = (seatId: string) => {
        if (!seatReservations || seatReservations.length === 0) {
            return ""; // No reservations, all seats available
        }
        const isReserved = seatReservations.some(reservation => reservation.seat.id === seatId);
        return isReserved ? "reserved-seat" : ""; // Add "reserved-seat" class if reserved
    };

    const renderSeat = (seat: Seat) => {
        const seatClass = getSeatStatus(seat.id);
        switch (seat.type) {
            case "regular":
                return <RegularSeat key={seat.id} number={seat.number} classes={seatClass} />;
            case "VIP":
                return <VipSeat key={seat.id} number={seat.number} classes={seatClass} />;
            case "love":
                return <LoveSeat key={seat.id} number={seat.number} classes={seatClass} />;
            default:
                return null;
        }
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
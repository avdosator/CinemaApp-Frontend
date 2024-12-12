import { useEffect, useState } from "react"
import "./SeatList.css"
import ApiService from "../../../service/ApiService"
import { Seat as SeatType } from "../../../types/Seat"
import RegularSeat from "../seat/RegularSeat"
import VipSeat from "../seat/VipSeat"
import LoveSeat from "../seat/LoveSeat"

type SeatListProps = {
    hallId: string
}

export default function SeatList({ hallId }: SeatListProps) {
    const [seats, setSeats] = useState<SeatType[]>([]);

    useEffect(() => {
        try {
            ApiService.get<SeatType[]>(`/seats`, { hall: hallId })
                .then(response => {
                    console.log(response);
                    setSeats(response);
                });
        } catch (error) {
            console.log(error);
        }
    }, [hallId])

    const renderSeat = (seat: SeatType) => {
        switch (seat.type) {
            case "regular":
                return <RegularSeat key={seat.id} number={seat.number} />;
            case "VIP":
                return <VipSeat key={seat.id} number={seat.number} />;
            case "love":
                return <LoveSeat key={seat.id} number={seat.number} />;
            default:
                return null;
        }
    };


    return (
        // <div className="seat-list">
        //     {seats.map(seat => renderSeat(seat))}
        // </div>
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
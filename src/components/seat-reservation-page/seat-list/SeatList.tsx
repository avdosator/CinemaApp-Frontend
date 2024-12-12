import { useEffect, useState } from "react"
import "./SeatList.css"
import ApiService from "../../../service/ApiService"
import { Seat as SeatType } from "../../../types/Seat"
import RegularSeat from "../seat/RegularSeat"

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
    }, [])
    return (
        <div className="seat-list">
            {seats.map(seat => (<RegularSeat key={seat.id} number={seat.number} type={seat.type} />))}
        </div>
    )
}
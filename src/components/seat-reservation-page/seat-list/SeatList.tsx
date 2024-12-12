import { useEffect, useState } from "react"
import "./SeatList.css"
import ApiService from "../../../service/ApiService"
import { Seat as SeatType } from "../../../types/Seat"
import Seat from "../seat/Seat"

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
            {seats.map(seat => (<Seat key={seat.id} number={seat.number} type={seat.type} />))}
        </div>
    )
}
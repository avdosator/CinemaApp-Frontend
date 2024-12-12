import "./SeatSchema.css"
import SeatList from "../seat-list/SeatList";

type SeatSchemaProps = {
    hallId: string 
}

export default function SeatSchema({hallId}: SeatSchemaProps) {
    return (
        <div className="seat-schema">
            <p className="font-lg-regular" style={{color: "#1D2939", marginBottom: "0px"}}>Cinema Screen</p>
            <div className="cinema-screen"></div>
            <SeatList hallId={hallId} />
        </div>
    )
}
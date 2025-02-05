import "./SeatSchema.css"
import SeatList from "../seat-list/SeatList";
import { ProjectionInstance } from "../../../../types/ProjectionInstance";
import { Seat } from "../../../../types/Seat";
import { Projection } from "../../../../types/Projection";

type SeatSchemaProps = {
    projectionInstance: ProjectionInstance,
    selectedSeats: Seat[], // Array of selected seat IDs
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>, // Setter function for selectedSeats
    projection: Projection
}

export default function SeatSchema({ projectionInstance, selectedSeats, setSelectedSeats, projection }: SeatSchemaProps) {
    return (
        <div className="seat-schema">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Cinema Screen</p>
            <div className="cinema-screen"></div>
            <SeatList projectionInstance={projectionInstance} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} projection={projection} />
        </div>
    )
}
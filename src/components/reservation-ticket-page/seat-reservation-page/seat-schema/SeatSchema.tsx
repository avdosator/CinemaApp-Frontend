import "./SeatSchema.css"
import SeatList from "../seat-list/SeatList";
import { ProjectionInstance } from "../../../../types/ProjectionInstance";

type SeatSchemaProps = {
    projectionInstance: ProjectionInstance,
    selectedSeats: string[]; // Array of selected seat IDs
    setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>; // Setter function for selectedSeats
}

export default function SeatSchema({ projectionInstance, selectedSeats, setSelectedSeats }: SeatSchemaProps) {
    return (
        <div className="seat-schema">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Cinema Screen</p>
            <div className="cinema-screen"></div>
            <SeatList projectionInstance={projectionInstance} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
        </div>
    )
}
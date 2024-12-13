import "./SeatSchema.css"
import SeatList from "../seat-list/SeatList";
import { ProjectionInstance } from "../../../types/ProjectionInstance";

type SeatSchemaProps = {
    projectionInstance: ProjectionInstance
}

export default function SeatSchema({ projectionInstance }: SeatSchemaProps) {
    return (
        <div className="seat-schema">
            <p className="font-lg-regular" style={{ color: "#1D2939", marginBottom: "0px" }}>Cinema Screen</p>
            <div className="cinema-screen"></div>
            <SeatList projectionInstance={projectionInstance} />
        </div>
    )
}
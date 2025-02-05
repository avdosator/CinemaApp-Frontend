//import { Projection } from "./Projection"
import { SeatReservation } from "./SeatReservation"

export type ProjectionInstance = {
    id: string,
    projectionId: string,
    date: Date,
    time: string,
    seatReservations: SeatReservation[]
}
import { SeatReservation } from "./SeatReservation"

export type ProjectionInstance = {
    id: string,
    //projection: Projection,
    date: Date,
    time: string,
    seatReservations: SeatReservation[]
}
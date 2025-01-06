import { Seat } from "./Seat"

export type SeatReservation = {
    id: string,
    seat: Seat,
    status: string
}
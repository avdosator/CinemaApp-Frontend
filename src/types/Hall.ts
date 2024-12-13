import { Seat } from "./Seat"
import { Venue } from "./Venue"

export type Hall = {
    id: string,
    name: string,
    venue: Venue,
    seats: Seat[]
}
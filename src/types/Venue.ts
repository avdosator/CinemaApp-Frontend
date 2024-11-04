import { City } from "./City"
import { Hall } from "./Hall"

export type Venue = {
    id: string,
    name: string,
    street: string,
    streetNumber: string,
    city: City,
    halls: Hall[],
    phone: string
    // add more later
}
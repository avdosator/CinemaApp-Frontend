import { City } from "./City"
import { Photo } from "./Photo"

export type Venue = {
    id: string,
    name: string,
    street: string,
    streetNumber: string,
    city: City,
    //halls?: Hall[],
    photo: Photo,
    phone: string
    // add more later
}
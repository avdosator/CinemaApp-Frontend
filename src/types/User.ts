import { City } from "./City";
import { Photo } from "./Photo";

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: City,
    role: string,
    photo: Photo
}

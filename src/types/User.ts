import { City } from "./City";

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: City,
    role: string,
}

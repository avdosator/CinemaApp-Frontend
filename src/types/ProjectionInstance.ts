import { Projection } from "./Projection"

export type ProjectionInstance = {
    id: string,
    projection: Projection,
    date: Date,
    time: string,
    seatsStatus: Record<string, string>
}
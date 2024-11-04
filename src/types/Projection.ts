import { Hall } from "./Hall"

export type Projection = {
    id: string,
    hall: Hall,
    movieId: string,
    startDate: Date,
    endDate: Date,
    startTime: string[],
    status: string,
    createdAt: Date,
    updatedAt: Date
}
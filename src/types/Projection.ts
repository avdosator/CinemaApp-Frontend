import { Hall } from "./Hall"
import { ProjectionInstance } from "./ProjectionInstance"

export type Projection = {
    id: string,
    hall: Hall,
    movieId: string,
    startDate: Date,
    endDate: Date,
    startTime: string[],
    status: string,
    projectionInstances: ProjectionInstance[],
    createdAt: Date,
    updatedAt: Date
}
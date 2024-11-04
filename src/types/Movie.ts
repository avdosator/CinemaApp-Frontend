import { Genre } from "./Genre"
import { Projection } from "./Projection"

export type Movie = {
    id: string,
    title: string,
    language: string,
    director: string,
    pgRating: string,
    durationInMinutes: number,
    synopsis: string,
    genres: Genre[],
    projections: Projection[],
    photos: Photo[]
    // add other props
}

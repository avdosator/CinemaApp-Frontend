import { Genre } from "./Genre"
import { Photo } from "./Photo"
import { Projection } from "./Projection"

export type Movie = {
    id: string,
    title: string,
    language: string,
    director: string,
    pgRating: string,
    durationInMinutes: number,
    writers: string[],
    actors: string[],
    imdbRating: number,
    rottenTomatoesRating: number,
    synopsis: string,
    trailerUrl: string,
    coverPhotoId: string,
    genres: Genre[],
    projections: Projection[],
    photos: Photo[]
    // add other props
}

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
    imdbRating: string,
    rottenTomatoesRating: string,
    synopsis: string,
    trailerUrl: string,
    coverPhotoId: string,
    status: string,
    genres: Genre[],
    projections: Projection[],
    photos: Photo[]
    // add other props
}

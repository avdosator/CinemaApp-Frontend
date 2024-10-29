import { Movie } from "./Movie"
import { Venue } from "./Venue"

export type CardList = {
    heading: string,
    movies?: Movie[],
    venues?: Venue[]
}

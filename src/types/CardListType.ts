import { MovieCardType } from "./MovieCardType"
import { VenueCardType } from "./VenueCardType"

export type CardListType = {
    heading: string,
    movies?: MovieCardType[],
    venues?: VenueCardType[]
}

export type CardListProps = {
    elements: CardListType
}
import { SelectOptionType } from "./SelectOptionType"

export type CurrentlyShowingFormData = {
    title: string,
    city: SelectOptionType | null,
    venue: SelectOptionType | null,
    genre: SelectOptionType | null,
    time: SelectOptionType | null,
    date: string
}

export type UpcomingMoviesFormData = {
    title: string,
    city: SelectOptionType | null,
    venue: SelectOptionType | null,
    genre: SelectOptionType | null,
    startDate: string,
    endDate: string
}

export type MovieDetailsFormData = {
    city: SelectOptionType | null,
    venue: SelectOptionType | null,
    date: string,
    time: string
}

export type GeneralFormData = {
    title: string,
    language: string,
    projectionDate: string,
    director: string,
    duration: number,
    genre: SelectOptionType[],
    trailer: string,
    synopsis: string
}
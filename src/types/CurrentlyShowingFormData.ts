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


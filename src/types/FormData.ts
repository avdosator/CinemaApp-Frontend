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
    startDate: string,
    endDate: string,
    director: string,
    pgRating: string,
    duration: string,
    genre: SelectOptionType[],
    trailer: string,
    synopsis: string
}

export type ProjectionsFormData = {
    city: SelectOptionType | null,
    venue: SelectOptionType | null,
    time: string
}

export type DetailsFormData = {
    writersData: string[];
    castData: string[];
    uploadedPhotos: File[];
    coverPhotoIndex: number | null;
};

export type AddMovieFormStep = 1 | 2 | 3;
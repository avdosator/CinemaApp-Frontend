export type MovieCardType = {
    id: string,
    title: string,
    duration: number,
    genre: string
    // add other props
}

export type MovieCardProps = {
    movie: MovieCardType
}
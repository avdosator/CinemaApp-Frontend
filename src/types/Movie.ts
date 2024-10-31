export type Movie = {
    id: string,
    title: string,
    durationInMinutes: number,
    synopsis: string,
    genres: [
        {
            id: string,
            name: string
        }
    ],
    projections: [
        {
            id: string,
            status: string
        }
    ]
    // add other props
}

export type Movie = {
    id: string,
    title: string,
    durationInMinutes: number,
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
